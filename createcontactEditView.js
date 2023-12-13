import { LightningElement,track } from 'lwc';

export default class CreatecontactEditView extends LightningElement {
    @track recordId;
    createcontact(event){
        this.recordId=event.target.id;
    }
}