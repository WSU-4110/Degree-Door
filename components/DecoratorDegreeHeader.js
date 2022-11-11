export default function DecoratorDegreeHeader({name, description}){
  return (
    <header>
      <img className='w-full h-[400px]' src="https://cdn.nbyula.com/public/community/6274d27f54121f0014506fe7/bannerImage/1651823982672-6274d27f54121f0014506fe7.jpeg" alt="Computer Science Banner"></img>
      <div className="name-description-wrapper flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="display-degree-name font-bold text-black uppercase hover:text-gray-700 text-5xl -translate-y-24">
        {name}
      </div>
      <p className="text-xl font-bold text-black text-center -translate-y-20">
        {description}
      </p>
      </div>
    </header>
  )
}
