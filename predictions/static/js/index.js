(function(){
  const form = document.getElementById('predictForm');
  const btn  = document.getElementById('submitBtn');

  form?.addEventListener('submit', function(){
    if(btn){
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Calculando…';
    }
  });

  // Evitar submit al presionar Enter en selects
  form?.querySelectorAll('select').forEach(sel=>{
    sel.addEventListener('keydown', e=>{
      if(e.key === 'Enter'){ e.preventDefault(); }
    });
  });
})();

// === Validación de inputs numéricos (permitir 0.1+, bloquear 0 y negativos) ===
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('predictForm');
  if (!form) return;

  const numericInputs = form.querySelectorAll('input[type="number"]');

  numericInputs.forEach(el => {
    // Bloquear negativos y notación científica (+/-/e/E)
    el.addEventListener('keydown', (e) => {
      const blocked = ['-', 'e', 'E', '+'];
      if (blocked.includes(e.key)) e.preventDefault();
    });

    // Validar al salir del campo
    el.addEventListener('blur', () => {
      const raw = el.value.trim();
      if (raw === '') { el.setCustomValidity(''); return; }

      const val = Number(raw);
      const min = el.min ? Number(el.min) : 0.1;

      if (!Number.isFinite(val) || val < min) {
        el.setCustomValidity(`El valor debe ser mayor que 0 (mínimo ${min}).`);
        el.reportValidity();
      } else {
        el.setCustomValidity('');
      }
    });
  });

  // Validar al enviar
  form.addEventListener('submit', (e) => {
    for (const el of numericInputs) {
      const raw = el.value.trim();
      const val = Number(raw);
      const min = el.min ? Number(el.min) : 0.1;

      if (!raw || !Number.isFinite(val) || val < min) {
        e.preventDefault();
        el.setCustomValidity(`El valor debe ser mayor que 0 (mínimo ${min}).`);
        el.reportValidity();
        el.focus();
        return;
      }
    }
  });
});