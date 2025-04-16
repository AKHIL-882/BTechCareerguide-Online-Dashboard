const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 60,
        behavior: "smooth",
      });
    }
  };
  
  export default scrollToSection;
  