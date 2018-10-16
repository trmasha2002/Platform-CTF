import React from "react"

export default
    class ValidatedInputField extends React.Component {
    render() {
        return (
            <div className="form-group" {...this.props.wrapper}>
                {this.props.label ? <label>{this.props.label}</label> : ''}
                {(() => {
                    if (this.props.type == 'textarea') {
                        return (
                            <textarea {...this.props} className="form-control" id={this.props.relid} ref={(i) => {
                                this.input = i
                            }} onBlur={() => {
                                {
                                    if ((!this.input.value.match(this.props.re) || (this.props.callback && !(this.props.callback(this.input.value))))){
                                        this.input.classList.add('is-invalid');
                                    }
                                    else {
                                        this.input.classList.remove('is-invalid');
                                    }
                                }
                            }} >{this.props.children}</textarea>
                        );
                    }
                    else {
                        return (
                            <input {...this.props} className="form-control" id={this.props.relid} ref={(i) => {
                                this.input = i
                            }} onBlur={() => {
                                {
                                    if ((!this.input.value.match(this.props.re) || (this.props.callback && !(this.props.callback(this.input.value))))){
                                        this.input.classList.add('is-invalid');
                                    }
                                    else {
                                        this.input.classList.remove('is-invalid');
                                    }
                                }
                            }} />
                        );
                    }
                })()}
                <div className="invalid-feedback">
                    {this.props.feedback}
                </div>
                {this.props.small ? <small>{this.props.small}</small> : ''}
            </div>
        )
    }
}