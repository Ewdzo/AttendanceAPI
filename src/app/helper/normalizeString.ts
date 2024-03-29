export const normalizeString = (string?: string, type?: string) => {
    string = String(string);
    if(string.replace(/\s+/g, ' ').trim().length <= 1) return string;
    const dontCapitalize = ["de", "da", "do"];
  
    if(type != "matricula") {
      return String(string).replace(/\s+/g, ' ').trim().split(" ").map(word => { 
        if(dontCapitalize.includes(word)) return word;
        return word[0].toUpperCase() + word.slice(1);
      }).join(" ").trim();
    }
    return string.toUpperCase().trim();
};
  