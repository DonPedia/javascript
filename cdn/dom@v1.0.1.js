function useState(initialValue) {
    let value = initialValue; // nilai awal
    let listeners = []; // array untuk menyimpan listener

    function setValue(newValue) {
      value = newValue; // set nilai baru
      // panggil semua listener
      listeners.forEach(listener => listener(value));
    }
    
    function useListener(listener) {
      // tambahkan listener ke array
      listeners.push(listener);
      // panggil listener dengan nilai awal
      listener(value);
    }
    
    return [value, setValue, useListener];
}
  

function useEffect(callback, dependencies) {
    // membuat variabel isFirstRender dengan nilai true
    let isFirstRender = true;
  
    // menyimpan nilai dependencies pada variabel prevDependencies
    let prevDependencies = [];
  
    // membuat fungsi untuk membandingkan nilai dependencies
    const compareDependencies = (dependencies, prevDependencies) => {
      // jika panjang dependencies berbeda dengan prevDependencies, maka return true
      if (dependencies.length !== prevDependencies.length) {
        return true;
      }
  
      // jika ada salah satu nilai pada dependencies yang berbeda dengan prevDependencies, maka return true
      for (let i = 0; i < dependencies.length; i++) {
        if (dependencies[i] !== prevDependencies[i]) {
          return true;
        }
      }
  
      // jika tidak ada nilai dependencies yang berbeda dengan prevDependencies, maka return false
      return false;
    };
  
    // membuat fungsi untuk menjalankan efek samping
    const runEffect = () => {
      if (isFirstRender) {
        // menjalankan efek samping pada render pertama
        callback();
        isFirstRender = false;
      } else {
        // membandingkan nilai dependencies dengan prevDependencies
        const isDependenciesChanged = compareDependencies(dependencies, prevDependencies);
  
        if (isDependenciesChanged) {
          // jika ada nilai dependencies yang berubah, maka menjalankan efek samping
          callback();
          prevDependencies = dependencies;
        }
      }
    };
  
    // menjalankan efek samping pada setiap render
    runEffect();
}
  


// Mendefinisikan library DOM
const GP = {
  
    select: (selector) => document.querySelector(selector),

    // Mencari elemen berdasarkan ID
    getById: (id) => document.getElementById(id),
    
    // Mencari elemen berdasarkan nama tag
    getByTag: (tag) => document.getElementsByTagName(tag),
  
    // Mencari elemen berdasarkan nama kelas
    getByClass: (className) => document.getElementsByClassName(className),
  
    // Membuat elemen baru
    create: (tag) => document.createElement(tag),
  
    // Menghapus elemen
    remove: (element) => element.parentNode.removeChild(element),
  
    // Menambahkan elemen ke dalam elemen lain
    append: (parent, child) => parent.appendChild(child),
  
    // Mengubah isi elemen
    text: (element, text) => element.textContent = text,
  
    // Menambahkan atribut ke dalam elemen
    attr: (element, attr, value) => element.setAttribute(attr, value),
  
    // Menghapus atribut dari elemen
    removeAttr: (element, attr) => element.removeAttribute(attr),
  
    // Menambahkan event listener ke dalam elemen
    on: (element, event, callback) => element.addEventListener(event, callback),
  
    // Menghapus event listener dari elemen
    off: (element, event, callback) => element.removeEventListener(event, callback),
};
  
  // Contoh penggunaan library DOM
//   const element = DOM.getById('my-element');
//   DOM.text(element, 'Ini adalah teks baru');
//   DOM.attr(element, 'class', 'new-class');
//   DOM.on(element, 'click', () => {
//     console.log('Elemen telah diklik');
//   });
  
