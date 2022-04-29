import React, { useState } from 'react'
const phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const urlPattern = /(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/

export default function useForm(initValue={}) {
    const [form,setForm] = useState(initValue)
    const[error,setError]= useState({})
    const rules=[]

    const handleChange = (ev)=>{
        let name = ev.currentTarget.name;
        let value = ev.currentTarget.value;

        setForm({
            ...form,
            [name]:value
        })
    }

    const validate = ()=>{
        let errObj = {};
        for(let i in rules){
            let r = rules[i]

            if(r.required && !form[i]){
                errObj[i]="Không được bỏ trống"
            }else if(r.pattern){
                let pattern = r.pattern
                if(pattern==="phone") pattern=phonePattern
                if(pattern==="email") pattern = emailPattern
                if(pattern ==="url") pattern=urlPattern

                if(!pattern.test(form[i])){
                    errObj[i]="Bạn chưa nhập đúng định dạng yêu cầu"
                }
            }
            if(r.min && (typeof form[i] ==='undefined' || form[i].length<6))
            {
                errObj[i]=`Bạn cần nhập tối thiểu ${r.min} kí tự`
            }
            if(r.max && (form[i] && form[i].length>32))
            {
                errObj[i]=`Bạn chỉ được nhập tối đa ${r.max} kí tự`
            }
            if(r.confirm && form[i]!==form['password']){
                errObj[i]='Xác nhận mật khẩu không đúng'
            }
        }
        return errObj
    }

    function register (name,rule){
        if(rule){
            rules[name]=rule
        }
        return{
            name:name,
            onChange:handleChange,
            value:form[name]
        }
    }

    const handleSubmit=(callback)=>{
        return (ev)=>{
            ev.preventDefault();
            let error =validate();
            if(Object.keys(error).length===0){
                callback(form)
            }
            setError(error)
        }
    }

    return {
        form,
        error,
        handleSubmit,
        register,
        setForm
    }
}
