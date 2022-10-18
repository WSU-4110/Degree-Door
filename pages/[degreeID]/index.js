import {useRouter} from 'next/router'

export default function DegreeHome() {
  const router = useRouter()
  console.log(router.query)
  return (
    <div>
      <div>
      This is what the home page for a degree will look like. There is going to be
      information that will be populated from the database into this home page. 
      </div>
      <div></div>
    </div>

  )
}

async function getServerSideProps() {

}