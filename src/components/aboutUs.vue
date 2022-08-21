<template>
    <div id="page-container">
        <div class="about_content">
            <h1>About us</h1>
            <h3>Our History</h3>
            <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>

            <!--drop down to view FAQ-->
            <h3>Want to know more? Here are some FAQs.</h3>
            <CAccordion>
                <CAccordionItem>
                    <CAccordionHeader>How often do we update?</CAccordionHeader>
                    <CAccordionBody>
                        Our stocks update once a week to bring you a variety of herbs.
                    </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem>
                    <CAccordionHeader>How do I contact you?</CAccordionHeader>
                    <CAccordionBody>
                        At bottom, the footer show all of the social media link to our page
                    </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem>
                    <CAccordionHeader>What Countries do you deliver to?</CAccordionHeader>
                    <CAccordionBody>
                        Our services mainly provided in Malaysia. However, we did support international
                        mailing for the orders made.
                    </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem>
                    <CAccordionHeader>How often do we update?</CAccordionHeader>
                    <CAccordionBody>
                        To enable our systems to recognize your browser or device and to provide and improve ourServices,
                        we use cookies and other identifiers. For more information about cookies and how we use them, please
                        read our Cookies Notice.
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>
        </div>
    </div>
</template>
    
<script>
import { CAccordion, CAccordionHeader, CAccordionBody} from '@coreui/vue'

export default {
  name: 'AboutUs',
  components: {
    CAccordion,
    CAccordionHeader,
    CAccordionBody
  }
}

</script>

<style>
    .about_content {
        margin: 1%;
        padding: 1%;
        padding-left: 2%;
        padding-right: 2%;
    }
    #page-container {
        position: relative;
        margin-top: 5%;
        min-height: 100px;
    }
    .collapsible {
        background-color: #777;
        color: white;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        border: none;
        text-align: left;
        outline: none;
        font-size: 15px;
    }
    .active,
    .collapsible:hover {
        background-color: #555;
    }
    .content {
        padding: 18px;
        display: none;
        overflow: hidden;
        background-color: #c2c2c2;
    }

</style>