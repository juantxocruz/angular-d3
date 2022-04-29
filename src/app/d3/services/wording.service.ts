import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WordingService {
  // dictionary getter
  // nommbre de la zona, corto, medio, largo
  // STRINGS
  // diccionary key: el diccionario
  // column: la columna del diccionario que devuelve
  // word: valor que se pasa (string)

  public getDictionaryName = (
    dictionary: Array<any>,
    column: string,
    word: string
  ): string => {
    // get the dictionary
    let dic: Array<any> = dictionary[0]['values'];
    let i: number = 0,
      result: string,
      dicLength: number = dic.length;

    for (i; i < dicLength; i++) {
      if (dic[i]['key'] === word) {
        result = dic[i][column];
      }
    }
    if (!result) {
      result = word;
    }
    return result;
  };

  ///// HELPERS ////

  public capitalize = (str) => {
    str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  public toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  public substringString(st: string, idx: number): string {
    return st.replace('  ', ' ').substring(0, idx);
  }
  // only white spaces
  public replaceWhiteSpaces(st: string) {
    return st.replace(/  +/g, ' ');
  }
  // Tabs, newlines, whites...
  public replaceTabsAndWhites(st: string) {
    return st.replace(/\s\s+/g, ' ');
  }
  public replaceUnderscores(st: string) {
    return st.replace(/_/g, ' ');
  }
  public replaceCalle(st: string) {
    return st.replace(/\s?(c\/|C\/|C\/V|CALLE|Calle|calle|Cl|CL)\s?/g, '');
  }
  public replaceAvenida(st: string) {
    return st.replace(/(avda|Avda|AVDA|avd|AVD|Avd|Av|AV|av).?/g, 'Avda. ');
  }
  public replaceEstacionServicio(st: string) {
    return st.replace(/(EE.SS.|E.S.|P.I.) ?/g, '');
  }
  public compareValues(key: string, order: string = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }
  public formatAddressVal(st: string): string {
    let result: string = this.replaceTabsAndWhites(st);
    result = this.replaceCalle(result);
    result = this.replaceEstacionServicio(result);
    result = this.replaceAvenida(result);
    result = this.replaceUnderscores(result);
    result = this.toTitleCase(result);
    result = result.replace('S/n', 's/n');
    result = result.replace(/ De /g, ' de ');
    result = result.replace(/^De /, '');
    result = result.replace(/ Y /g, ' y ');
    return result;
  }
  public formatTitleVal(st: string): string {
    let result: string = this.replaceTabsAndWhites(st);
    result = this.replaceCalle(result);
    result = this.replaceEstacionServicio(result);
    result = this.replaceAvenida(result);
    result = this.replaceUnderscores(result);
    //result = this.toTitleCase(result);
    result = result.replace('S/n', 's/n');
    result = result.replace(/ De /g, ' de ');
    result = result.replace(/^De /, '');
    result = result.replace(/ Y /g, ' y ');
    return result;
  }


}
