import React, { useState } from 'react';

export default function Calculator() {
  const [results, setResults] = useState({});
  const [peso, setPeso] = useState('');
  const [cms, setCms] = useState('');

  const calculateMinerals = () => {
    const requerimientos = {
      Ca: (cms * 0.65),
      P: (cms * 0.31),
      Mg: (cms * 0.1),
      S: (cms * 0.15),
      Zn: (30 * cms),
    };

    const aportes = {
      Ca: (cms * 0.23),
      P: (cms * 0.1),
    };

    const balances = {
      Ca: requerimientos.Ca - aportes.Ca,
      P: requerimientos.P - aportes.P,
      Mg: requerimientos.Mg,
      S: requerimientos.S,
      Zn: requerimientos.Zn,
    };

    const fuentes = {
      fosfatoTricalcico: 32,
      florDeAzufre: 96,
      sulfatoZn: 23,
    };

    const cantidades = {
      Ca: (100 * balances.Ca) / fuentes.fosfatoTricalcico,
      S: (100 * balances.S) / fuentes.florDeAzufre,
      Zn: (100 * (balances.Zn / 1000)) / fuentes.sulfatoZn,
    };

    setResults({ requerimientos, aportes, balances, cantidades });
  };

  const resetCalculator = () => {
    setPeso('');
    setCms('');
    setResults({});
  };

  const exportResults = () => {
    const data = [
      ['Elemento', 'Requerimiento (g)', 'Aporte (g)', 'Balance (g)', 'Cantidad Fuente (g)'],
      ['Calcio', results.requerimientos?.Ca.toFixed(2), results.aportes?.Ca.toFixed(2), results.balances?.Ca.toFixed(2), results.cantidades?.Ca.toFixed(2)],
      ['Fósforo', results.requerimientos?.P.toFixed(2), results.aportes?.P.toFixed(2), results.balances?.P.toFixed(2), 'N/A'],
      ['Magnesio', results.requerimientos?.Mg.toFixed(2), 'N/A', results.balances?.Mg.toFixed(2), 'N/A'],
      ['Azufre', results.requerimientos?.S.toFixed(2), 'N/A', results.balances?.S.toFixed(2), results.cantidades?.S.toFixed(2)],
      ['Zinc', results.requerimientos?.Zn.toFixed(2), 'N/A', results.balances?.Zn.toFixed(2), results.cantidades?.Zn.toFixed(2)],
    ];

    const csvContent = "data:text/csv;charset=utf-8,"
      + data.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "resultados_calculo.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className='container mt-4'>
      <div className="text-center mb-4">
        <h2>CALCULADOR MINERAL</h2>
      </div>
      
      <div className="border p-3 mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label>Peso del animal (kg):</label>
          <input 
            type="text" 
            className="form-control" 
            value={peso} 
            onChange={(e) => {
              const value = e.target.value.replace(',', '.');
              if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                setPeso(value);
              }
            }} 
          />
        </div>

        <div className="mb-3">
          <label>CMS (kg/día):</label>
          <input 
            type="text" 
            className="form-control" 
            value={cms} 
            onChange={(e) => {
              const value = e.target.value.replace(',', '.');
              if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                setCms(value);
              }
            }} 
          />
        </div>

        <button className="btn btn-primary mb-2" onClick={calculateMinerals}>Calcular</button>
        <button className="btn btn-success mb-2" onClick={exportResults} disabled={!results.requerimientos}>Exportar Resultados</button>
        <button className="btn btn-secondary mb-2" onClick={resetCalculator}>Reiniciar</button>

        {results.requerimientos && (
          <div className="results border p-3 mt-3 bg-light">
            <h3>Requerimientos</h3>
            <p>Calcio: {results.requerimientos.Ca.toFixed(2)} g</p>
            <p>Fósforo: {results.requerimientos.P.toFixed(2)} g</p>
            <p>Magnesio: {results.requerimientos.Mg.toFixed(2)} g</p>
            <p>Azufre: {results.requerimientos.S.toFixed(2)} g</p>
            <p>Zinc: {results.requerimientos.Zn.toFixed(2)} mg</p>
          </div>
        )}
        
        {results.balances && (
          <div className="results border p-3 mt-3 bg-light">
            <h3>Balances</h3>
            <p>Calcio: {results.balances.Ca.toFixed(2)} g</p>
            <p>Fósforo: {results.balances.P.toFixed(2)} g</p>
          </div>
        )}

        {results.cantidades && (
          <div className="results border p-3 mt-3 bg-light">
            <h3>Cantidades de Fuentes Minerales</h3>
            <p>Fosfato Tricálcico: {results.cantidades.Ca.toFixed(2)} g</p>
            <p>Flor de Azufre: {results.cantidades.S.toFixed(2)} g</p>
            <p>Sulfato de Zinc: {results.cantidades.Zn.toFixed(2)} g</p>
          </div>
        )}
      </div>
    </div>
  );
}
