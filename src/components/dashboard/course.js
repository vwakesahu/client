import Link from "next/link";

export const Course = ({
  title,
  category,
  rating,
  students,
  progress,
  iconSvg,
  colorScheme,
  link = "/",
}) => {
  const { darker, lighter } = colorScheme;

  return (
    <Link href={link}>
      <div className="relative rounded-3xl overflow-hidden">
        {/* Progress Background with Wave Curve */}
        <div className="absolute inset-0 flex">
          <div
            className="h-full relative"
            style={{
              width: `${progress}%`,
              backgroundColor: darker,
              clipPath: `path('M 0 0 
                         L calc(100% - 150px) 0
                         C calc(100% - 100px) 0,
                           calc(100% + 200px) 0,
                           calc(100% + 100px) 50%
                         C calc(100% + 200px) 100%,
                           calc(100% - 100px) 100%,
                           calc(100% - 150px) 100%
                         L 0 100% Z')`,
              transition: "all 0.5s ease-in-out",
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent"
              style={{ to: `${darker}20` }}
            ></div>
          </div>
          <div
            className="h-full flex-grow"
            style={{ backgroundColor: lighter }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-2 rounded-full">{iconSvg}</div>
              <span className="text-sm font-medium">{category}</span>
            </div>
            <div className="bg-white px-3 py-1 rounded-full flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{rating}</span>
            </div>
          </div>

          <h1 className="text-2xl font-semibold mb-2">{title}</h1>
          <p className="text-black tracking-tighter font-medium">
            {students} students
          </p>
        </div>
      </div>
    </Link>
  );
};
