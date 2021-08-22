import React from "react";
import "./App.css";

function Form() {
  const { useState } = React;
  const [name, setName] = useState({ content: "", hasError: false });
  const [email, setEmail] = useState({ content: "", hasError: false });
  const [phone, setPhone] = useState({ content: "", hasError: false });
  const [source, setSource] = useState({ content: "", hasError: false });
  const [type, setType] = useState({ content: "", hasError: false });
  const [other, setOther] = useState("");

  const handleSubmit = (e, name, email, phone, type, source, other) => {
    e.preventDefault();
    if (!name.content) {
      setName({
        name,
        hasError: true,
      });
    }
    if (!email.content) {
      setEmail({
        email,
        hasError: true,
      });
    }
    if (!phone.content) {
      setPhone({
        phone,
        hasError: true,
      });
    }
    if (!type.content) {
      setType({
        type,
        hasError: true,
      });
    }
    if (!source.content) {
      setSource({
        source,
        hasError: true,
      });
    }
    if (
      name.content &&
      email.content &&
      phone.content &&
      type.content &&
      source.content
    ) {
      alert(`
        姓名: ${name.content}
        信箱: ${email.content}
        手機: ${phone.content}    
        報名類型: ${type.content}
        如何得知: ${source.content}
      `);
    }
  };
  return (
    <div className="wrapper">
      <form
        id="myForm"
        onSubmit={(e) => {
          handleSubmit(e, name, email, phone, type, source, other);
        }}
      >
        <h1>新拖延運動報名表單</h1>
        <h2>活動日期：2020/12/10 ~ 2020/12/11</h2>
        <h2>活動地點：台北市大安區新生南路二段1號</h2>
        <h3>*必填</h3>
        <section className="information">
          <label htmlFor="name">
            <div>
              暱稱: <span>*</span>
            </div>
            <input
              type="text"
              id="name"
              placeholder="您的回答"
              onChange={(e) => {
                setName({ content: e.target.value, hasError: false });
              }}
            />
            <p className={name.hasError ? "" : "noError"}>請輸入暱稱</p>
          </label>
          <label htmlFor="email">
            <div>
              電子郵件: <span>*</span>
            </div>
            <input
              type="email"
              id="email"
              placeholder="你的電子郵件"
              onChange={(e) => {
                setEmail({ content: e.target.value, hasError: false });
              }}
            />
            <p className={email.hasError ? "" : "noError"}>請輸入電子郵件</p>
          </label>
          <label htmlFor="phone">
            <div>
              手機號碼: <span>*</span>
            </div>
            <input
              type="number"
              id="phone"
              placeholder="你的手機號碼"
              onChange={(e) => {
                setPhone({ content: e.target.value, hasError: false });
              }}
            />
            <p className={phone.hasError ? "" : "noError"}>請輸入手機號碼</p>
          </label>
        </section>
        <section>
          <div>
            報名類型: <span>*</span>
          </div>
          <label>
            <input
              type="radio"
              className="radio-button"
              name="type"
              onChange={() => {
                setType({ content: "躺在床上用想像力實作", hasError: false });
              }}
            />
            躺在床上用想像力實作
          </label>
          <br />
          <label>
            <input
              type="radio"
              className="radio-button"
              name="type"
              onChange={() => {
                setType({ content: "趴在地上滑手機找現成的", hasError: false });
              }}
            />
            趴在地上滑手機找現成的
          </label>
          <p className={type.hasError ? "" : "noError"}>請輸入</p>
        </section>
        <section className="information">
          <label htmlFor="source">
            <div>
              怎麼知道這個活動的? <span>*</span>
            </div>
            <input
              type="text"
              id="source"
              placeholder="您的回答"
              onChange={(e) => {
                setSource({ content: e.target.value, hasError: false });
              }}
            />
            <p className={source.hasError ? "" : "noError"}>請輸入</p>
          </label>
          <label htmlFor="other">
            <div>其他</div>
            <span>對活動的一些建議</span>
            <input
              id="other"
              placeholder="您的回答"
              onChange={(e) => {
                setOther(e.target.value);
              }}
            />
          </label>
        </section>
        <input type="submit" className="button" id="button" />
        <p>請勿透過表單送出您的密碼。</p>
      </form>
    </div>
  );
}

export default Form;
