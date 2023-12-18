import { LightningElement,track,wire,api } from 'lwc';
import getServiceResources from '@salesforce/apex/FetchResourceAbsenceRecords.getServiceResources';
export default class CustomResourceAbsence extends LightningElement  {
    @track recordTypeId;
    @track resourceName='';
    @track resourceList=[];
    @track resoruceId;
    @track messageResult=false;
    @track showSearchValue=false;
   @track isButtonClicked = false;

  //new button clicked
  handleClick() {
      // Set the flag to true when the button is clicked
     this.isButtonClicked = true;
      
  }
  
   // look up field for service resource
    @wire(getServiceResources, {resName:'$resourceName'})
  retrieveServiceResources({error,data}){
    if(data){
        this.resourceList=data;
        this.showSearchValue=data.length >0;
        this.messageResult=data.length === 0 && this.resourceName !== '';

    }
    else if(error){
        console.error(error);
    }
  }
  handleChange(event){
    this.resourceName= event.target.value;
  }
  handleparentsection(event){
    this.resoruceId=event.target.dataset.value;
    this.resourceName=event.target.dataset.label;
    const selectedEvent= new CustomEvent('selected',{detail: this.resoruceId});
    this.dispatchEvent(selectedEvent);
    this.showSearchValue=false;
  }

  //type field - combobox
  get options() {
    return [
        { label: 'Vacation', value: 'Vacation' },
        { label: 'Meeting', value: 'Meeting' },
        { label: 'Training', value: 'Training' },
        { label: 'Medical', value: 'Medical' },

    ];
}


handleCloseModal() {
  this.isButtonClicked = false;
}
}
