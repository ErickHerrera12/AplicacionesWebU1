/* ============================================================
   script.js - Centro de Tutorías Académicas
   Etapa 4: interactividad accesible en JavaScript vanilla
   Módulo 1: menú móvil desplegable (aria-expanded + Escape)
   Módulo 2: validación del formulario con avisos aria-live
   ============================================================ */

'use strict';

/* ---------- 1. Menú móvil accesible ---------- */
function initMenuMovil() {
  const nav = document.querySelector('.sitio-nav');
  const boton = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu-principal');

  if (!nav || !boton || !menu) return;

  const esEscritorio = window.matchMedia('(min-width: 768px)');

  function abrirMenu() {
    nav.classList.add('nav-abierto');
    boton.setAttribute('aria-expanded', 'true');
  }

  function cerrarMenu(devolverFoco) {
    if (!nav.classList.contains('nav-abierto')) return;
    nav.classList.remove('nav-abierto');
    boton.setAttribute('aria-expanded', 'false');
    if (devolverFoco) boton.focus();
  }

  function alternarMenu() {
    const abierto = boton.getAttribute('aria-expanded') === 'true';
    if (abierto) {
      cerrarMenu(false);
    } else {
      abrirMenu();
    }
  }

  boton.addEventListener('click', alternarMenu);

  /* Al elegir un enlace, el menú se cierra para dejar ver el destino */
  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) cerrarMenu(false);
  });

  /* Escape cierra el menú y devuelve el foco al botón */
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && nav.classList.contains('nav-abierto')) {
      cerrarMenu(true);
    }
  });

  /* Al cambiar a escritorio el menú se restablece a su estado base */
  esEscritorio.addEventListener('change', (evento) => {
    if (evento.matches) cerrarMenu(false);
  });
}

/* ---------- 2. Validación accesible del formulario ---------- */
function initValidacionFormulario() {
  const formulario = document.querySelector('.form-academico');
  if (!formulario) return;

  /* JS toma el control de la validación con mensajes propios */
  formulario.setAttribute('novalidate', '');

  /* Reglas por campo: función de validación + mensaje legible */
  const REGLAS = {
    nombres: {
      valido: (valor) => valor.trim().length >= 5 && valor.trim().includes(' '),
      mensaje: 'Ingresa al menos un nombre y un apellido.',
    },
    correo: {
      valido: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim()),
      mensaje: 'Ingresa un correo válido, por ejemplo nombre@dominio.com.',
    },
    telefono: {
      valido: (valor) => /^0\d{8,9}$|^\+?\d{7,13}$/.test(valor.trim().replace(/[\s-]/g, '')),
      mensaje: 'Ingresa un número de contacto válido (7 a 13 dígitos).',
    },
    'cedula-matricula': {
      valido: (valor) => /^\d{10}$/.test(valor.trim()) || /^[A-Za-z0-9]{5,15}$/.test(valor.trim()),
      mensaje: 'Ingresa una cédula de 10 dígitos o tu código de matrícula.',
    },
    asignatura: {
      valido: (valor) => valor !== '',
      mensaje: 'Selecciona la asignatura que deseas reforzar.',
    },
    motivo: {
      valido: (valor) => valor.trim().length >= 10,
      mensaje: 'Describe el tema a revisar con al menos 10 caracteres.',
    },
  };

  /* Crea (una vez) el span de error junto al campo. Al existir desde
     la carga, funciona como región aria-live confiable para el lector */
  function crearSpanError(idDestino, contenedor) {
    let error = document.getElementById(idDestino);
    if (!error) {
      error = document.createElement('span');
      error.id = idDestino;
      error.className = 'mensaje-error';
      error.setAttribute('aria-live', 'polite');
      contenedor.appendChild(error);
    }
    return error;
  }

  function prepararCampo(id) {
    const control = document.getElementById(id);
    if (!control) return null;
    const grupo = control.closest('.campo-grupo');
    const error = crearSpanError('error-' + id, grupo);
    return { control, error, regla: REGLAS[id] };
  }

  const campos = Object.keys(REGLAS).map(prepararCampo).filter(Boolean);
  const radios = Array.from(formulario.querySelectorAll('input[name="paquete"]'));
  const errorPaquete = crearSpanError('error-paquete', document.querySelector('.grupo-paquetes'));

  function marcarCampo(control, ok, mensaje, spanError) {
    if (ok) {
      spanError.textContent = '';
      control.removeAttribute('aria-invalid');
      control.classList.remove('campo-invalido');
    } else {
      spanError.textContent = mensaje;
      control.setAttribute('aria-invalid', 'true');
      control.classList.add('campo-invalido');
    }
  }

  function evaluarCampo(item) {
    const ok = item.regla.valido(item.control.value);
    marcarCampo(item.control, ok, item.regla.mensaje, item.error);
    return ok;
  }

  function evaluarPaquete() {
    const ok = radios.some((radio) => radio.checked);
    radios.forEach((radio) => {
      if (ok) {
        radio.removeAttribute('aria-invalid');
      } else {
        radio.setAttribute('aria-invalid', 'true');
      }
    });
    errorPaquete.textContent = ok ? '' : 'Selecciona uno de los paquetes disponibles.';
    return ok;
  }

  /* Validación en tiempo real: al salir del campo y mientras corrige */
  campos.forEach((item) => {
    const control = item.control;

    control.addEventListener('blur', () => {
      if (control.value !== '') evaluarCampo(item);
    });

    control.addEventListener('input', () => {
      if (control.getAttribute('aria-invalid') === 'true') evaluarCampo(item);
    });

    if (control.tagName === 'SELECT') {
      control.addEventListener('change', () => evaluarCampo(item));
    }
  });

  radios.forEach((radio) => radio.addEventListener('change', evaluarPaquete));

  /* Aviso general del formulario: región viva anunciada por lectores */
  const aviso = document.createElement('p');
  aviso.className = 'aviso-formulario';
  aviso.setAttribute('role', 'alert');
  formulario.prepend(aviso);

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const resultados = campos.map((item) => ({ item, ok: evaluarCampo(item) }));
    const paqueteOk = evaluarPaquete();
    const primerInvalido = resultados.find((r) => !r.ok);

    const totalErrores = resultados.filter((r) => !r.ok).length + (paqueteOk ? 0 : 1);

    if (totalErrores > 0) {
      aviso.className = 'aviso-formulario aviso-error';
      aviso.textContent = totalErrores === 1
        ? 'Hay 1 campo con errores. Revisa los mensajes marcados en rojo.'
        : 'Hay ' + totalErrores + ' campos con errores. Revisa los mensajes marcados en rojo.';
      if (primerInvalido) {
        primerInvalido.item.control.focus();
      } else {
        radios[0].focus();
      }
    } else {
      aviso.className = 'aviso-formulario aviso-exito';
      aviso.textContent = 'Solicitud enviada correctamente. Te contactaremos por correo o WhatsApp para coordinar tu sesión.';
      formulario.reset();
      campos.forEach((item) => {
        item.error.textContent = '';
        item.control.classList.remove('campo-invalido');
        item.control.removeAttribute('aria-invalid');
      });
      errorPaquete.textContent = '';
      radios.forEach((radio) => radio.removeAttribute('aria-invalid'));
    }
  });
}

/* ---------- 3. Arranque ---------- */
initMenuMovil();
initValidacionFormulario();
