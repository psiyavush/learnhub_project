function getModal (options) {
    
	//Функция формирования HTML-кода модального окна
	function createModalWindow(options) {
        let elemModal = document.createElement('div');
        let modalTemplate = `<div class="window" data-dismiss="modal">
								<div class="window__content">
									<div class="window__header">
										<div class="window__title" data-modal="title">{{title}}</div>
										<span class="window__btn-close" data-dismiss="modal" title="Закрыть">×</span>
									</div>
									<div class="window__body" data-modal="content">{{content}}</div>
								</div>
							</div>`;
      
        elemModal.classList.add('modal');
        let modalHTML = modalTemplate.replace('{{title}}', options.title || 'Новое окно');
        modalHTML = modalHTML.replace('{{content}}', options.content || '');
               
        elemModal.innerHTML = modalHTML;
        document.body.appendChild(elemModal);
        return elemModal;
    }
	
	//Функция отображения окна на странице
	let createModal;
	let eventShowModal;
	let hiding = false;
	let destroyed = false;
	
    function showModal() {
        if (!destroyed && !hiding) {
            createModal.classList.add('window__show');
            document.dispatchEvent(eventShowModal);
        }
    }
	
	//Функция скрытия окна на странице
	let eventHideModal;
	
    function hideModal() {
		let animationSpeed = 200;
        hiding = true;
        createModal.classList.remove('window__show');
        createModal.classList.add('window_hiding');
        setTimeout(function () {
            createModal.classList.remove('window_hiding');
            hiding = false;
        }, animationSpeed);
        document.dispatchEvent(eventHideModal);
    }
	
	//Функция закрытия окна по крестику или по клику вне окна
    function handlerCloseModal(e) {
        if (e.target.dataset.dismiss === 'modal') {
            hideModal();
        }
    }

    createModal = createModalWindow(options || {});
    createModal.addEventListener('click', handlerCloseModal);
    eventShowModal = new CustomEvent('show.modal', { detail: createModal });
    eventHideModal = new CustomEvent('hide.modal', { detail: createModal });

    return {
        show: showModal,
        hide: hideModal,
        destroy: function () {
            createModal.parentElement.removeChild(createModal),
                createModal.removeEventListener('click', handlerCloseModal),
                destroyed = true;
        },
        setContent: function (html) {
            createModal.querySelector('[data-modal="content"]').innerHTML = html;
        },
        setTitle: function (text) {
            createModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    }
};