import {inject} from 'aurelia-dependency-injection';
import {bindable, bindingMode,customElement} from 'aurelia-framework';
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules,
  validateTrigger
} from 'aurelia-validation';
import {BootstrapFormRenderer} from './bootstrap-form-renderer';

@customElement("demo-textbox")
@inject(ValidationControllerFactory)
export class DemoTextbox {
  
  @bindable({ defaultBindingMode: bindingMode.twoWay}) placeholder: string;
  @bindable propertyName: '';
  @bindable disabled;
  @bindable minlength;
  @bindable maxlength;
  @bindable focusAutofocus;
  @bindable focusIndex;
  @bindable pattern;
  @bindable spellcheck:boolean;
  @bindable autocomplete;
  controller = null;
  @bindable textValue='';
  @bindable displayName: string;
  
   constructor(controllerFactory) {
    this.controller = controllerFactory.createForCurrentScope(); 
    ValidationRules
    .ensure((c:DemoTextbox) => c.textValue)
    .required().withMessage("This field is required!")
    .maxLength(50)
    .on(DemoTextbox);
  }
  
  attached() {
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.controller.validate();
   } 
   
   public inputValueChange():void{
     alert(this.textValue);
   }
}
