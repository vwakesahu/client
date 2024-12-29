'use client'

import { useRive } from '@rive-app/react-canvas'

const Members = () => {
  const { RiveComponent, rive } = useRive({
    src: '/rive/members_list.riv',
    autoplay: true,
    stateMachines: 'Animation',
    onLoad: () => {

      if (rive) {
        const stateMachineNames = rive.stateMachineNames;
        console.log('Available State Machines:', stateMachineNames);
      }
    }
  })

  console.log(rive?.stateMachineNames)

  return (
    <div style={{ width: '100%', height: '500px' }} className='mt-12'>
      <RiveComponent />
    </div>
  )
}

export default Members
