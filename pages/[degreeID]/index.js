import {useRouter} from 'next/router'
import { doc, getDoc } from 'firebase/firestore'

import {db} from '../../firebase'
export default function DegreeHome({name, description}) {
  return (
    <div>
      <div>
      This is what the home page for a degree will look like. There is going to be
      information that will be populated from the database into this home page. 
      </div>
      <div>
        {name}
      </div>
      <div>
        {description}
      </div>
    </div>

  )
}

export async function getServerSideProps(context) {
  const docRef = doc(db, "Degrees", `${context.params.degreeID}`);
  const docSnap = await getDoc(docRef);
  const degreeName = docSnap.data().degreeName;
  const degreeDescription = docSnap.data().description;
  return {
    props: {
      name: degreeName,
      description: degreeDescription,
    }
  };
}