  <div class="align">
  {#if !checkCart({ id: product.id })}
    <button
      on:click="{()=>addToCart({ id: product.id, name: product.name, price: product.price, img: product.img,qty:1 })}"
    >
      <div class="button1 buttonrounded1 btnalign">
        <img src="/plus.svg" alt="" />
      </div>
    </button>
    {:else}
    <div >
      <div class="size1">
        <button
          class="button1 buttonrounded1 "
          on:click="{()=>
            addToCart({
              id: product.id,
              name: product.name,
              img: product.img,
              price: product.price,
              qty: -1
            })}
          "
        >
          <img src="/minus.svg" alt="" />
        </button>
        <span class="size2">{ getQty({ id: product.id }) }</span>
        <button
          class="button1 button.is-danger buttonrounded1 btnplus-clr"
          on:click="{()=>
            addToCart({
              id: product.id,
              name: product.name,
              img: product.img,
              price: product.price,
              qty: 1
            })}
          "
        >
          <img src="/plus.svg" alt="" />
        </button>
      </div>
    </div>
    {/if}
  </div>
<script>
export let product
</script>
<style>
.size1 {
  display: flex;
  flex-direction: row;
}
.size2 {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
.buttonrounded1 {
  border-radius: 50px;
  width: 33px;
}
.button.is-danger {
  border-color: transparent;
  color: #fff;
}
.button1 {
  border: 1px solid transparent;
  border-width: 1px;
  color: #32325d;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  background: #f5f5f5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.btnplus-clr {
  background: #ffdd57;
}
.button1:hover {
  background: #ffdd57;
}
.button {
  border: 1px solid transparent;
  border-width: 1px;
  color: #32325d;
  background-color: white;
  cursor: pointer;
  justify-content: center;
  padding: calc(0.375em - 1px) 0.75em;
  padding-bottom: 0px;
  text-align: center;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.button:hover {
  background: #ff3860;
  color: #fff;
}
.buttonrounded {
  border-radius: 15px;
  height: 34px;
  border-left-width: 2px;
}
.align {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}
/* .plus {
  font-size: 25px;
  margin-top: -3px;
} */
.cart-icon {
  padding-bottom: 3px;
  padding-left: 5px;
}
/* .center {
  display: flex;
  flex-direction: row;
  align-items: center;
} */
.addalign {
  padding-top: 4px;
}
</style>
