<template>
    <div class="container">
        <div class="billing_details">
            <div class="row">
                <div class="col-lg-8">
                    <h3>Billing Details</h3>
                    <form class="row contact_form" method="post" action="payment.php" novalidate="novalidate">
                        <div class="col-md-6 form-group p_star">
                            <input type="text" class="form-control" id="first" name="name"
                                placeholder="First name" />
                        </div>
                        <div class="col-md-6 form-group p_star">
                            <input type="text" class="form-control" id="last" name="name"
                                placeholder="Last name" />
                        </div>
                        <div class="col-md-6 form-group p_star">
                            <input type="text" class="form-control" id="number" name="number"
                                placeholder="Phone number" />
                        </div>
                        <div class="col-md-6 form-group p_star">
                            <input type="text" class="form-control" id="email" name="compemailany"
                                placeholder="Email Address" />
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <input type="text" class="form-control" id="country" name="country"
                                placeholder="Country" />
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <input type="text" class="form-control" id="add" name="add"
                                placeholder="Address line" />
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <input type="text" class="form-control" id="city" name="city"
                                placeholder="Town/City" />
                        </div>
                        <div class="col-md-12 form-group">
                            <input type="text" class="form-control" id="zip" name="zip"
                                placeholder="Postcode/ZIP" />
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <input type="text" class="form-control" id="state" name="state"
                                placeholder="State" />
                        </div>
                        
                        <div class="col-md-12 form-group">
                            <div class="creat_account">
                                <h3>Shipping Details</h3>
                                <div class="checkout-cap">
                                    <input type="checkbox" id="f-option3" name="selector" />
                                    <label for="f-option3">Ship to a different address?</label>
                                </div>
                            </div>
                            <textarea class="form-control" name="message" id="message" rows="1"
                                placeholder="Order Notes"></textarea>
                        </div>

                        <input class="btn w-100" type="submit" value="Proceed to Payment"/>
                    </form>
                </div>
                <div class="col-lg-4">
                    <div class="order_box">
                        <h2>Your Order</h2>
                        <ul class="list">
                            <li>
                                <a>Product<span>Total</span>
                                </a>
                            </li>
                            <!-- <?php
                            if(mysqli_num_rows($result) > 0){
                                while($row = mysqli_fetch_assoc($result)){
                                    echo '<li>'
                                        .'<a>'.$row['bookName'].''
                                            .'<span class="middle">x '.$row['numberOfBooks'].'</span>'
                                            .'<span class="last">'.$row['numberOfBooks']*$row['totalPriceOfOne'].'</span>'
                                        .'</a>'
                                    .'</li>';
                                }
                            }
                        ?> -->
                        </ul>
                        <ul class="list list_2">
                            <li>
                                <!-- <?php echo '<a>Subtotal <span>RM '.$totalPrice.'</span></a>' ?> -->
                            </li>
                            <li>
                                <a>Shipping
                                    <span>Flat rate: RM5</span>
                                </a>
                            </li>
                            <li>
                                <!-- <?php
                                $tp = $totalPrice + 5.00;
                            echo '<a>'
                                .'Total<span>RM '.$tp.'</span>'
                                .'</a>';
                            ?> -->
                            </li>
                        </ul>
                        <div class="payment_item active">
                        </div>
                        <div class="creat_account checkout-cap">
                            <input type="checkbox" id="f-option8" name="selector" />
                            <label for="f-option8">I've read and accept the <a href="#">terms & conditions*</a>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'checkOut',
  components: {

  }
}
</script>

<style>

</style>


