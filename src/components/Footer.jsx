const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <small>
        <p>{currentYear} Marcus Hugo. Made with 🤔 and ☕️ .</p>
      </small>
    </footer>
  )
}

export default Footer
