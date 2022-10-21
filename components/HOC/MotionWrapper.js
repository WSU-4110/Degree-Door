import { motion } from 'framer-motion'

/*
    Higher order component which will wrap each component in a motion.div
    that will make an appearing animation whenever the section comes
    into view.
    
*/  

export default function MotionWrap({ Component }) {
  return (
    <motion.div
        // This motion.div will animate each section such that whenever they
        // come into view, they appear as they are coming into the page.
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1]}}
        transition={{ duration: 0.5 }}
        className="flex"
    >
      <Component />
    </motion.div>
  )
}
