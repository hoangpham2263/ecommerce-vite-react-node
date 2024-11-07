import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './PageReload.module.scss'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.032
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.15 }
  }
}

const cx = classNames.bind(styles)

const PageReload = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className={cx('loading-screen')}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cx('loading-animation')}
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className={cx('item')}
              variants={item}
              transition={{ duration: 0.15 }}
            />
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.5 }}
      className={cx('page-content')}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default PageReload
