export default function DecoratorDegreeTab({data1, data2}){
  return (
        <div className="name-description-wrapper flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="display-degree-name font-bold text-black uppercase hover:text-gray-700 text-5xl -translate-y-24">
          {data1.name}
        </div>
        <p className="text-xl font-bold text-black text-center -translate-y-20">
          {data2.description}
        </p>
        </div>
  )
}
