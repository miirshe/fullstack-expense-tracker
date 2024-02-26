import { auth, signIn, signOut } from "@/auth";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const Dashboard = async () => {
  const user = await auth();

  return (
    <div>
      <h1>{JSON.stringify(user)}</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <div className="flex items-center">
          <FiLogOut className="mr-2 h-4 w-4" />
          <button type="submit">Log out</button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
