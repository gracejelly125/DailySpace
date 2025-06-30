'use client';

import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SignUpPrompt = () => {
  return (
    <>
      <p className="mt-2 mb-4 mx-auto text-textBlack">아직 계정이 없으신가요?</p>

      <motion.div
        className="mx-auto"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Link className="warn-btn" href="/sign-up">
          회원가입
        </Link>
      </motion.div>
    </>
  );
};

export default SignUpPrompt;
