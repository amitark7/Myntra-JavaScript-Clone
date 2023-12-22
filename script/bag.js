const CONVENIENCE_FEE=99;
PageLoad();
let bagArray=bagItem.map(searchItem)
dispayBagItem()

function dispayBagItem(){
  let BagContainer=document.querySelector('.bag-items-container');
  let innerHtml=''
  bagArray.forEach(item => {
    innerHtml+=`
    <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>
            <div class="remove-from-cart" onclick='deleteItem(${item.id})'>X</div>
    </div>
    `
  });
  BagContainer.innerHTML=innerHtml;
}

function searchItem(itemId){
  for(let i=0; i<items.length; i++){
    if(itemId==items[i].id){
      return items[i];
    }
  }
}

function deleteItem(obj){
  bagItem=bagItem.filter((item)=>{
    return obj!==item
  })
  localStorage.setItem('bagCount',JSON.stringify(bagItem));
  bagArray=bagItem.map(searchItem)
  dispayBagItem();
  BagCount();
  summary();
}

summary();
function summary(){
  let bagSummary=document.querySelector('.bag-summary');
  let totalMRP=0;
  let discountPrice=0;

  bagArray.forEach(item=>{
    totalMRP+=item.original_price;
    discountPrice+=item.original_price-item.current_price;
  })

  let finalPrice=(totalMRP-discountPrice)+CONVENIENCE_FEE;
  bagSummary.innerHTML=`
  <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${bagItem.length} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${discountPrice}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${CONVENIENCE_FEE}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalPrice}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
        </div>
  </div>
  `
}