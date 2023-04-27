interface Theme {
    backgroundColor: string;
    textColor: string;
    iconColor: string;
    // Ajoutez d'autres couleurs personnalisées pour votre application ici
  }
  
  const darkTheme: Theme = {
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    iconColor: '#000000'
    // Ajoutez d'autres couleurs personnalisées pour votre application ici
  };
  
  const lightTheme: Theme = {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    iconColor: '#000000'
    // Ajoutez d'autres couleurs personnalisées pour votre application ici
  };
  
  export { darkTheme, lightTheme };
  