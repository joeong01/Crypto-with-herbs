<template>
    <div style="margin: 4%;">
        <div id="page-container">
            <div class="about_content">
                <h1>Blog</h1>
                <CAccordion>
                    <CAccordionItem v-for="blog in blogs" :key="blog.id">
                        <CAccordionHeader><b>{{ blog.title }}</b>&emsp;  by: {{ blog.author }}</CAccordionHeader>
                        <CAccordionBody>{{ blog.content}}</CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { CAccordion, CAccordionHeader, CAccordionBody} from '@coreui/vue'

export default {
    components: {
        CAccordion,
        CAccordionHeader,
        CAccordionBody
    },
    data(){
        return{
            blogs: [],
        
        }
    },
    created() {
        this.getBlog();
    },
    methods:{
        async getBlog() {
            this.blogs = (await axios.get("http://localhost:5000/blogs")).data;
        }
    },
};
</script>

<style>

</style>