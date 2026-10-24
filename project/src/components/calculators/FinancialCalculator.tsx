'use client';

import { useState, useMemo } from 'react';
import { Dictionary } from '@/lib/dictionaries';

interface FinancialCalculatorProps {
  dictionary: Dictionary;
  locale: 'ca' | 'es' | 'en';
}

export function FinancialCalculator({ dictionary, locale }: FinancialCalculatorProps) {
  const [mode, setMode] = useState<'compound' | 'annuity' | 'loan' | 'presentValue'>('compound');
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(10);
  const [frequency, setFrequency] = useState(12);
  const [payment, setPayment] = useState(100);
  const [paymentType, setPaymentType] = useState<'ordinary' | 'due'>('ordinary');

  const t = dictionary.calculators?.financial || {
    title: 'Financial Calculator',
    modes: { compound: 'Compound Interest', annuity: 'Annuity', loan: 'Loan', presentValue: 'Present Value' },
    labels: { principal: 'Principal', rate: 'Annual Rate (%)', time: 'Time (years)', frequency: 'Compounding Frequency', payment: 'Payment', paymentType: 'Payment Type', ordinary: 'Ordinary', due: 'Due', result: 'Result', futureValue: 'Future Value', presentValue: 'Present Value', totalPaid: 'Total Paid', totalInterest: 'Total Interest' }
  };

  const results = useMemo(() => {
    const r = rate / 100;
    const n = frequency;
    const t_years = time;

    switch (mode) {
      case 'compound': {
        const futureValue = principal * Math.pow(1 + r / n, n * t_years);
        const totalInterest = futureValue - principal;
        return { futureValue, totalInterest, principal };
      }
      case 'annuity': {
        const i = r / n;
        const periods = n * t_years;
        const factor = paymentType === 'due' ? (1 + i) : 1;
        const futureValue = payment * factor * ((Math.pow(1 + i, periods) - 1) / i);
        const totalPaid = payment * periods;
        const totalInterest = futureValue - totalPaid;
        return { futureValue, totalPaid, totalInterest };
      }
      case 'loan': {
        const i = r / n;
        const periods = n * t_years;
        const monthlyPayment = principal * (i * Math.pow(1 + i, periods)) / (Math.pow(1 + i, periods) - 1);
        const totalPaid = monthlyPayment * periods;
        const totalInterest = totalPaid - principal;
        return { monthlyPayment, totalPaid, totalInterest };
      }
      case 'presentValue': {
        const i = r / n;
        const periods = n * t_years;
        const factor = paymentType === 'due' ? (1 + i) : 1;
        const presentValue = payment * factor * (1 - Math.pow(1 + i, -periods)) / i;
        const totalPaid = payment * periods;
        const totalInterest = totalPaid - presentValue;
        return { presentValue, totalPaid, totalInterest };
      }
    }
  }, [mode, principal, rate, time, frequency, payment, paymentType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(locale === 'ca' ? 'ca-ES' : locale === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="calculator-container financial-calculator">
      <h2>{t.title}</h2>
      
      <div className="calculator-tabs">
        {[
          { id: 'compound', label: t.modes.compound },
          { id: 'annuity', label: t.modes.annuity },
          { id: 'loan', label: t.modes.loan },
          { id: 'presentValue', label: t.modes.presentValue }
        ].map(tab => (
          <button
            key={tab.id}
            className={`tab ${mode === tab.id ? 'active' : ''}`}
            onClick={() => setMode(tab.id as typeof mode)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="calculator-inputs">
        <div className="input-group">
          <label>{t.labels.principal}</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            step="100"
            min="0"
          />
        </div>

        <div className="input-group">
          <label>{t.labels.rate}</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            step="0.1"
            min="0"
            max="100"
          />
        </div>

        <div className="input-group">
          <label>{t.labels.time}</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            step="1"
            min="1"
            max="50"
          />
        </div>

        {['compound', 'annuity', 'loan', 'presentValue'].includes(mode) && (
          <div className="input-group">
            <label>{t.labels.frequency}</label>
            <select value={frequency} onChange={(e) => setFrequency(Number(e.target.value))}>
              <option value={1}>Annual</option>
              <option value={2}>Semi-annual</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
              <option value={52}>Weekly</option>
              <option value={365}>Daily</option>
            </select>
          </div>
        )}

        {['annuity', 'presentValue'].includes(mode) && (
          <>
            <div className="input-group">
              <label>{t.labels.payment}</label>
              <input
                type="number"
                value={payment}
                onChange={(e) => setPayment(Number(e.target.value))}
                step="10"
                min="0"
              />
            </div>
            <div className="input-group">
              <label>{t.labels.paymentType}</label>
              <select value={paymentType} onChange={(e) => setPaymentType(e.target.value as typeof paymentType)}>
                <option value="ordinary">{t.labels.ordinary}</option>
                <option value="due">{t.labels.due}</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div className="calculator-results">
        <h3>{t.labels.result}</h3>
        <div className="results-grid">
          {mode === 'compound' && (
            <>
              <div className="result-item">
                <span className="result-label">{t.labels.futureValue}</span>
                <span className="result-value">{formatCurrency(results.futureValue)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">{t.labels.totalInterest}</span>
                <span className="result-value">{formatCurrency(results.totalInterest)}</span>
              </div>
            </>
          )}
          {mode === 'annuity' && (
            <>
              <div className="result-item">
                <span className="result-label">{t.labels.futureValue}</span>
                <span className="result-value">{formatCurrency(results.futureValue)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">{t.labels.totalPaid}</span>
                <span className="result-value">{formatCurrency(results.totalPaid)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">{t.labels.totalInterest}</span>
                <span className="result-value">{formatCurrency(results.totalInterest)}</span>
              </div>
            </>
          )}
          {mode === 'loan' && (
            <>
              <div className="result-item">
                <span className="result-label">Monthly Payment</span>
                <span className="result-value">{formatCurrency(results.monthlyPayment)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">{t.labels.totalPaid}</span>
                <span className="result-value">{formatCurrency(results.totalPaid)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">{t.labels.totalInterest}</span>
                <span className="result-value">{formatCurrency(results.totalInterest)}</span>
              </div>
            </>
          )}
          {mode === 'presentValue' && (
            <>
              <div className="result-item">
                <span className="result-label">{t.labels.presentValue}</span>
                <span className="result-value">{formatCurrency(results.presentValue)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">{t.labels.totalPaid}</span>
                <span className="result-value">{formatCurrency(results.totalPaid)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">{t.labels.totalInterest}</span>
                <span className="result-value">{formatCurrency(results.totalInterest)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
