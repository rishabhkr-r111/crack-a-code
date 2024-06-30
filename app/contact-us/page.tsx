
export default function ContactUs() {
  const styles = {
    container: {
      backgroundColor: '#333', // Dark blue background
      color: '#fff', // White text color
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    contactInfo: {
      marginBottom: '20px',
      padding: '10px',
      backgroundColor: '#23395d',
      borderRadius: '8px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    label: {
      marginBottom: '10px',
      width: '100%',
      maxWidth: '400px',
      color: '#fff',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#f4f4f4', // Light color text box
      color: '#333', // Dark text color inside text box
    },
    textarea: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#f4f4f4', // Light color text box
      color: '#333', // Dark text color inside text box
      minHeight: '100px',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#4CAF50', // Green button
      color: '#fff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us by filling the form below or using the contact information provided.</p>
      
      <div style={styles.contactInfo}>
        <h2>Contact Information</h2>
        <p>Email: crackacode@gmail.com</p>
        <p>Phone: +1(123)456-7890</p>
        <p>Address: Bangalore:560017</p>
      </div>
      
      <h2>Contact Form</h2>
      <form style={styles.form}>
        <label style={styles.label}>
          Name:
          <input type="text" name="name" style={styles.input} />
        </label>
        <label style={styles.label}>
          Email:
          <input type="email" name="email" style={styles.input} />
        </label>
        <label style={styles.label}>
          Message:
          <textarea name="message" style={styles.textarea}></textarea>
        </label>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
