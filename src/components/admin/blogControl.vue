<template>
    <div style="margin: 4%;">
        <div id="page-container">
            <div class="about_content">
                <h1>Blog<CButton style="margin-left: 89%;" color="primary" shape="rounded-pill" @click="add = true;">Add New</CButton></h1>
                <CModal size="xl" alignment="center" :visible="add" @close="add = false;" >
                    <CModalHeader>
                    <CModalTitle><label>Name: </label><input type="text" id="Title" placeholder="Title" @change="isEmpty()"/></CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <label>Author: </label><input type="text" id="Author" placeholder="Author" @change="isEmpty()"/><br><br>                       
                        <Label>Content:</Label><br>
                        <textarea id="Content" rows="15" cols="145" placeholder="Content" @change="isEmpty()"></textarea><br>
                        <CButton id="toAdd" @click="toAdd(); add = false" color="primary" shape="rounded-pill">Add</CButton>
                    </CModalBody>
                </CModal>
                <CAccordion>
                    <CAccordionItem v-for="blog in blogs" :key="blog.id">
                        <CAccordionHeader><b>{{ blog.title }}</b>&emsp;  by: {{ blog.author }}</CAccordionHeader>
                        <CAccordionBody>
                            <label>Name:&emsp;</label><input type="text" :value="blog.title" :id="blog.id + 'title'" placeholder="Title" @change="checking(blog.id)"/><br><br>
                            <label>Author:&emsp;</label><input type="text" :value="blog.author" :id="blog.id + 'author'" placeholder="Author" @change="checking(blog.id)"/><br><br>
                            <Label>Content:&emsp;</Label><br>
                            <textarea :value="blog.content" :id="blog.id + 'content'"  rows="15" cols="215" placeholder="Content" @change="checking(blog.id)"></textarea><br>
                            <div style="margin-left: 85%; margin-top: 1%;">
                                <CButton :id="blog.id+'update'" @click="update(blog.id)" color="primary" shape="rounded-pill" >Update to Database</CButton>
                                <CButton @click="remove(blog.id)" color="danger" shape="rounded-pill">Delete</CButton>
                            </div>
                        </CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { CAccordion, CAccordionHeader, CAccordionBody, CButton, CModal, CModalBody, CModalHeader} from '@coreui/vue'

export default {
    components: {
        CAccordion,
        CAccordionHeader,
        CAccordionBody,
        CButton,
        CModal, 
        CModalBody,
        CModalHeader
    },
    data(){
        return{
            blogs: [],
            add: false,
        }
    },
    created() {
        this.getBlog();
    },
    methods:{
        async getBlog() {
            this.blogs = (await axios.get("http://localhost:5000/blogs")).data;
        },
        checking(ID){
            if(document.getElementById(ID+'title').value != "" && document.getElementById(ID+'author').value != "" && document.getElementById(ID+'content').value != ""){
                document.getElementById(ID+'update').removeAttribute("disabled");
            }
            else{
                document.getElementById(ID+'update').setAttribute("disabled","disabled");
            }
        },
        async update(ID){
            const response = await axios.put("http://localhost:5000/blog/update",{
                title: document.getElementById(ID+'title').value,
                author: document.getElementById(ID+'author').value,
                content: document.getElementById(ID+'content').value,
                id: ID,
            });
            console.log(response);
            alert("Updated");
            window.location.reload();
        },
        async remove(ID){
            if(confirm("Are you sure wan to delete \"" + document.getElementById(ID+'name').value + "\"?")){
                console.log(await axios.put("http://localhost:5000/blog/delete",{ id: ID,}));
                alert("Removed");
                window.location.reload();
            }
        },
        isEmpty(){
            if(document.getElementById("Title").value != "" && document.getElementById("Author").value != "" && document.getElementById("Content").value != ""){
                document.getElementById("toAdd").removeAttribute("disabled");
            }
            else{
                document.getElementById("toAdd").setAttribute("disabled","disabled");
            }
        },
        async toAdd(){
            console.log(document.getElementById("Title").value + document.getElementById("Author").value + document.getElementById("Content").value);
            const temp = await axios.post("http://localhost:5000/blog/insert",{
                title: document.getElementById("Title").value,
                author: document.getElementById("Author").value,
                content: document.getElementById("Content").value,
            });

            console.log(temp);

        }
    },
};
</script>

<style>

</style>