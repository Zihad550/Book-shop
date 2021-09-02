
// get data from input field 
document.getElementById('search-btn').addEventListener('click', () => {
  const field = document.getElementById('search-field');
  const searchText = field.value;
  field.value = '';
  fetch(` https://openlibrary.org/search.json?q=${searchText}`)
  .then(res => res.json())
  .then(data => displayResult(data));
});

 
// show search result
const displayResult = input =>{
  const container = document.getElementById('display-result');
  container.textContent = '';
  const totalResult = document.getElementById('show-total-result');
  totalResult.innerText = `${input.numFound}`;

  // checks the length of result
  if(input.numFound === 0){
    const message = document.createElement('h2');
    message.classList.add('text-warning');
    message.innerText = 'No results found';
    container.appendChild(message);
  };

  input.docs.forEach(book => {
    console.log(book);
    // checks if the authord name is undefined
    if(book.author_name === undefined){
      book.author_name = 'Unknown';
    };

    // checks if the publish year is undefined
    if(book.first_publish_year === undefined){
      book.first_publish_year = 'Unknown';
    };
    
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100 shadow-md">
    <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top h-100 " alt="book image">
    <div class="card-body">
      <h4 class="card-title">${book.title}</h4>
      <p class="card-text">Author: ${book.author_name}</span>
      <p class="card-text">First Published: ${book.first_publish_year}</span>
    </div>
  </div>
    `;
    container.appendChild(div);
  });
};

