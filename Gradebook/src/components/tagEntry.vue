<template>
    <q-dialog ref="dialog" @hide="onDialogHide">
        <q-card>
            <q-card-section>
                <h4>Enter a new tag!</h4>
                <q-input outlined v-model="inputTag" label="Enter a Tag" @keydown.enter="addTag" />
                <q-btn @click="addTag"  color="white" text-color="black" label="Save" />
            </q-card-section>
            <q-card-section>
                <h4>Current Tags (Click to Delete)</h4>
                <q-btn v-for="tag in tags" :key="tag.id" :label="tag.tag" @click="deleteTag(tag.id)"/>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import db from 'src/boot/firebase'
export default {
    name: 'tagEntry',
    data() {
        return {
            inputTag: '',
            tags: [], 
            newTag: {
                tag: ''
            }   
        }   
    },
    methods: {
        addTag() {
            this.newTag.tag = this.inputTag;
            db.collection("tags").add(this.newTag)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id)
                this.inputTag = '';
            })
            .catch((error) => {
                console.error("Error adding document: ", error)
            });
        },
        deleteTag(inputID){
            let index = this.tags.findIndex(tag => tag.id === inputID );
            db.collection("tags").doc(inputID).delete().then(() => {
                console.log("Tag deleted: "+ inputID);
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        
        },
        // following method is REQUIRED
        // (don't change its name --> "show")
        show () {
        this.$refs.dialog.show()
        },

        // following method is REQUIRED
        // (don't change its name --> "hide")
        hide () {
        this.$refs.dialog.hide()
        },

        onDialogHide () {
        // required to be emitted
        // when QDialog emits "hide" event
        this.$emit('hide')
        },

        onOKClick () {
        // on OK, it is REQUIRED to
        // emit "ok" event (with optional payload)
        // before hiding the QDialog
        this.$emit('ok')
        // or with payload: this.$emit('ok', { ... })

        // then hiding dialog
        this.hide()
        },

        onCancelClick () {
        // we just need to hide dialog
        this.hide()
        }
    },
    mounted() {
        db.collection("tags")
        .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let tagChange = change.doc.data()
          tagChange.id = change.doc.id
            if (change.type === "added") {
                console.log("New tag ", tagChange);
                this.tags.unshift(tagChange)
            }
            if (change.type === "modified") {
                console.log("Modified tag: ", tagChange);
            }
            if (change.type === "removed") {
                console.log("Removed tag: ", tagChange);
                let index = this.tags.findIndex(tag => tag.id === tagChange.id);
                this.tags.splice(index,1)
            }
        });
        });
    }
    
}
</script>