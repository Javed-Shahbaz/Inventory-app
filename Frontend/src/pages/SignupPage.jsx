import { motion } from "framer-motion";
import { Input } from "components/Input";
import { User } from "lucide-react";
import { useState } from "react";

const SignupPage = () => {
  const [name, setName] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Sign Up Attempted:", name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-yellow-100 bg-opacity-5 backdrop-filter rounded-2xl shadow-xl overflow-hidden p-8"
    >
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-emerald-500 text-transparent bg-clip-text">
        Create Account
      </h2>
      <form onSubmit={handleSignup}>
        <Input
          icon={<User />}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
        >
          Sign Up
        </button>
      </form>
    </motion.div>
  );
};

export default SignupPage;
