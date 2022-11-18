import { useState } from "react";
import axios from 'axios';
import { ResultSection } from '../ResultSection';

import styles from "./form.module.css";

const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [predictionResult, setPredictionResult] = useState('');
  

  const makeRequest = async (route: string, data: any) => {
    const options = {
      method: 'POST',
      url: `${process.env.API_URL}/${route}` || `http://localhost:4000/${route}`,
      headers: {
        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'
      },
      data: data
    };
    
    return await axios.request(options)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("image", file as File);
    data.append("age", age);
   
    const { data: blobData } = await makeRequest('upload', data)
    data.append("image_id", blobData['image_id'])

    const { data: predictData } = await makeRequest('predict', data)
    console.log(predictData)
    setPredictionResult(predictData['classification_result'])
    
  }

  return (
    <div>
    <form className={styles.form} onSubmit={handleSubmit}>
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
          onChange={(e) => {
            if(e.target.files) {
              setFile(e.target.files[0])
            }
          }}
          required
        />
      </div>

      <div className={styles.form_group}>
        <div>
          <label htmlFor="license">You agree with the terms?</label>
          <input
            id="license"
            type="checkbox"
            required
          />
        </div>
      </div>

      <button className={styles.button}>Sent</button>
    </form>


      <ResultSection predictionResult={predictionResult} />
    </div>
  );
};

export default Form;
