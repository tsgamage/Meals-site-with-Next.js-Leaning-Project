"use client";
import classes from "./page.module.css";

export default function Error({ error }) {
  return (
    <main className="error">
      <h1>An error occurred</h1>
      <p>Failed to create meal. Please check your inputs and try again later.</p>
    </main>
  );
}
