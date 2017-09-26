import { HtmlElement, Button, MsgBox, Toast } from 'cx/widgets';

export class AsyncButton extends Button {

    declareData(context, instance) {
        return super.declareData(...arguments, {
            busyText: undefined
        });
    }

    prepareData(context, instance) {
        let {data, state} = instance;

        if (state && state.running) {
            data.attrs = data.attrs || {};
            data.attrs.disabled = true;
            if (data.icon)
                data.icon = 'loading';

            if (data.busyText)
                data.text = data.busyText;
        }

        super.prepareData(context, instance);
    }

    attachProps(context, instance, props) {
        delete props.busyText;
        super.attachProps(context, instance, props);
    }

    init() {
        let onClick = this.onClick;

        let invoke = function(handler, e, instance) {
            if (typeof handler === 'string') 
                return instance.controller[handler].call(instance.controller, e, instance);
            else 
                return handler.call(this, e, instance);
        }

        this.onClick = (e, instance) => {
            let promise = onClick && invoke(onClick, e, instance);
            if (promise) {
                instance.setState({'running': true});
                Promise
                    .resolve(promise)
                    .then(x => {
                        instance.setState({'running': false});
                        return x;
                    })
                    .catch(e => {
                        instance.setState({'running': false});

                        switch (this.errorHandling) {
                            case 'none':
                                throw e;

                            case 'console':
                                console.log(e);
                                break;

                            case 'alert':
                                MsgBox.alert(e.toString());
                                break;

                            case 'toast':
                                let toast = Toast.create({
                                    message: e.toString(),
                                    timeout: 5000
                                });
                                toast.open(this.store);
                                break;
                        }
                    });
            }
        };

        super.init();
    }
}

AsyncButton.prototype.errorHandling = "none";