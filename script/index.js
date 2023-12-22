let bagItem=JSON.parse(localStorage.getItem('bagCount'))||[];

PageLoad();
function PageLoad(){
  displayItems();
  BagCount();
}


function addBag(itemId){
  bagItem.push(itemId);
  localStorage.setItem('bagCount',JSON.stringify(bagItem));
  BagCount()
}

function BagCount(){
  let bagCount=document.querySelector('.bag-item-count')
  bagCount.innerText=bagItem.length;
}
function displayItems(){
  let itemsContainer=document.querySelector('.items-container')
  if(!itemsContainer){
    return '';
  }

  let innerHtml=''
  items.forEach(item=>{
    innerHtml+=`            
    <div class="item-container">
    <img src=${item.image} class="item-image" alt="Cart Image">
    <div class="rating">
        ${item.rating.stars} ⭐| ${item.rating.count}
    </div>
    <div class="company">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="origional-price">Rs ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
    </div>
    <button class="btn-add-bag" onclick="addBag(${item.id})">Add to bag</button>
    </div>`
  })
  itemsContainer.innerHTML=innerHtml;
}