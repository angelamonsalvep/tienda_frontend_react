import React from 'react';

const BillForm = ({ form, onChange }) => (
  <div className="bill-form">
    <input
      type="text"
      placeholder="Nombre"
      value={form.firstName}
      onChange={e => onChange({ ...form, firstName: e.target.value })}
    />
    <input
      type="text"
      placeholder="Apellido"
      value={form.lastName}
      onChange={e => onChange({ ...form, lastName: e.target.value })}
    />
    <input
      type="text"
      placeholder="Dirección"
      value={form.address}
      onChange={e => onChange({ ...form, address: e.target.value })}
    />
    <input
      type="text"
      placeholder="Ciudad"
      value={form.city}
      onChange={e => onChange({ ...form, city: e.target.value })}
    />
  </div>
);

export default BillForm;
