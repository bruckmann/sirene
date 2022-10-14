import { useState } from "react";
import axios from 'axios'
import styles from "./form.module.css";

const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [files, setFile] = useState<FileList | null>(null);
  const [license, setLicense] = useState('')


  type Data = {
    name: string;
    age: string;
    image: FileList | null;
    license: string;
  }

  const normalizeApi = process.env.NORMALIZE_API_URL
  const apiKey = process.env.NORMALIZE_API_KEY 
  
  const onSubmit = async () => {
    const json: Data = {
     name,
     age,
     license,
     image: files
    } 

    const response = await axios.post(
        normalizeApi || 'http://localhost:7071/api/normalizeApi',
        { json }, 
        { headers: { api_key: apiKey }}
    )
    
    console.log(response)

  }

  return (
    <form className={styles.form}>
      <div className={styles.form_group}>
        <label htmlFor="name" className={styles.label}>
          Your name
        </label>
        <input
          id="name"
          type="text"
          className={styles.input}
          placeholder="Full name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="age" className={styles.label}>
          Your age
        </label>
        <input
          id="age"
          type="number"
          className={styles.input}
          placeholder="18"
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="file" className={styles.label}>
          Your corneal topographic exam
        </label>
        <input
          id="file"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className={styles.input}
          onChange={(e) => setFile(e.target.files)}
          required
        />
      </div>

      <div className={styles.form_group}>
        <div>
          <label htmlFor="license">You agree with the terms?</label>
          <input
            id="license"
            type="checkbox"
            onChange={(e) => {
              setLicense(e.target.value);
            }}
            required
          />
        </div>
      </div>

      <button className={styles.button} onSubmit={onSubmit}>Sent</button>
    </form>
  );
};

export default Form;
