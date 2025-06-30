'use client';

import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SignInPrompt = () => {
  return (
    <>
      <p className="mt-2 mb-4 mx-auto text-textBlack">
        이미 계정이 있으신가요?
      </p>

      <motion.div
        className="mx-auto"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Link className="warn-btn" href="/sign-in">
          로그인
        </Link>
      </motion.div>
    </>
  );
};

export default SignInPrompt;
