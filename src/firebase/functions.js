import { db } from "./config";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

// Helper function to generate transaction ID
function generateTransactionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Helper function to update or create an address document
async function updateOrCreateAddressDoc(address, transaction) {
  const addressDocRef = doc(collection(db, "hqTransactions"), address);
  const addressDoc = await getDoc(addressDocRef);

  if (!addressDoc.exists()) {
    // Create new document with first transaction
    await setDoc(addressDocRef, {
      transactions: [{ ...transaction, id: generateTransactionId() }],
    });
  } else {
    // Add transaction to existing document
    await updateDoc(addressDocRef, {
      transactions: arrayUnion({ ...transaction, id: generateTransactionId() }),
    });
  }
}

// Helper function to get transactions for an address
async function getAddressTransactions(address) {
  const addressDocRef = doc(collection(db, "hqTransactions"), address);
  const addressDoc = await getDoc(addressDocRef);

  if (!addressDoc.exists()) {
    return [];
  }

  return addressDoc.data().transactions || [];
}

// Helper function to calculate next claim date
function calculateNextClaimDate(currentDate, period) {
  const date = new Date(currentDate.seconds * 1000);
  
  switch (period.toLowerCase()) {
    case 'month':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'week':
      date.setDate(date.getDate() + 7);
      break;
    case 'day':
      date.setDate(date.getDate() + 1);
      break;
    default:
      throw new Error("Invalid period specified");
  }

  return Timestamp.fromDate(date);
}

// Function to add a transaction
export const addTransaction = async (fromAddress, toAddress, amount, method) => {
  try {
    const timestamp = new Date();
    const transaction = {
      fromAddress,
      toAddress,
      amount,
      status: "Processed",
      method,
      timestamp,
    };

    // Create sender's transaction
    const senderTx = {
      ...transaction,
      type: "sent",
    };

    // Create receiver's transaction
    const receiverTx = {
      ...transaction,
      type: "received",
    };

    // Add transactions to both addresses' documents
    await Promise.all([
      updateOrCreateAddressDoc(fromAddress, senderTx),
      updateOrCreateAddressDoc(toAddress, receiverTx),
    ]);

    return {
      success: true,
      message: "Transaction added successfully",
    };
  } catch (error) {
    console.error("Error adding transaction: ", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Function to create token stream
export const createTokenStream = async (streamData) => {
  try {
    const streamRef = doc(collection(db, "tokenStreams"));
    const stream = {
      recipient: streamData.recipient,
      recipientName: streamData.name || null,
      token: streamData.token,
      amountPerPeriod: parseFloat(streamData.amount),
      period: streamData.period,
      status: "active",
      createdAt: Timestamp.now(),
      lastClaim: Timestamp.now(),
      nextClaim: calculateNextClaimDate(Timestamp.now(), streamData.period),
    };

    await setDoc(streamRef, stream);

    // Add initial transaction record
    await addTransaction(
      "SYSTEM",
      streamData.recipient,
      streamData.amount,
      "STREAM_CREATED"
    );

    return {
      success: true,
      streamId: streamRef.id,
      message: "Token stream created successfully",
    };
  } catch (error) {
    console.error("Error creating token stream:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Function to claim from token stream
export const claimTokenStream = async (streamId, recipientAddress) => {
  try {
    const streamRef = doc(db, "tokenStreams", streamId);
    const streamDoc = await getDoc(streamRef);

    if (!streamDoc.exists()) {
      throw new Error("Stream not found");
    }

    const streamData = streamDoc.data();
    if (streamData.recipient !== recipientAddress) {
      throw new Error("Unauthorized claim attempt");
    }

    const now = Timestamp.now();
    if (now.seconds < streamData.nextClaim.seconds) {
      throw new Error("Next claim date not reached");
    }

    await updateDoc(streamRef, {
      lastClaim: now,
      nextClaim: calculateNextClaimDate(now, streamData.period),
    });

    // Add claim transaction
    await addTransaction(
      recipientAddress,
      "SYSTEM",
      streamData.amountPerPeriod,
      "TOKEN_CLAIMED"
    );

    return {
      success: true,
      message: "Token claimed successfully",
    };
  } catch (error) {
    console.error("Error claiming token:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};



export const getTransactions = async (walletAddresses) => {
  try {
    const [primaryAddress, secondaryAddress] = walletAddresses;
    const transactions = [];

    // Get transactions for both addresses
    const [primaryTxs, secondaryTxs] = await Promise.all([
      getAddressTransactions(primaryAddress),
      secondaryAddress ? getAddressTransactions(secondaryAddress) : Promise.resolve([]),
    ]);

    // Combine and sort all transactions
    transactions.push(...primaryTxs, ...secondaryTxs);

    // Sort by timestamp (newest first)
    transactions.sort((a, b) => {
      const timestampA = b.timestamp?.seconds || b.timestamp?.getTime() / 1000;
      const timestampB = a.timestamp?.seconds || a.timestamp?.getTime() / 1000;
      return timestampA - timestampB;
    });

    return {
      success: true,
      data: transactions,
    };
  } catch (error) {
    console.error("Error getting transactions: ", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Function to get active streams
export const getActiveStreams = async (address) => {
  try {
    const streamsRef = collection(db, "tokenStreams");
    const q = query(
      streamsRef,
      where("recipient", "==", address),
      where("status", "==", "active")
    );

    const querySnapshot = await getDocs(q);
    const streams = [];

    querySnapshot.forEach((doc) => {
      streams.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      data: streams,
    };
  } catch (error) {
    console.error("Error getting streams:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export {
  updateOrCreateAddressDoc,
  getAddressTransactions,
  generateTransactionId,
};