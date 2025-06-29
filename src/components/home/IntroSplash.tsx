import { motion } from 'framer-motion';

const IntroSplash = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <motion.div
        className="text-3xl font-bold text-textBlack"
        initial={{ scale: 0 }}
        animate={{ scale: [0.8, 1.2, 1] }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        오늘도 화이팅! 💪🔥
      </motion.div>
    </div>
  );
};

export default IntroSplash;
