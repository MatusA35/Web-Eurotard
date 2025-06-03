document.addEventListener('DOMContentLoaded', function () {
    const modals = [
      { modalId: 'pdfModal1', viewerId: 'pdfViewer1', downloadId: 'pdfDownload1', shareId: 'shareBtn1', printId: 'printBtn1' },
      { modalId: 'pdfModal2', viewerId: 'pdfViewer2', downloadId: 'pdfDownload2', shareId: 'shareBtn2', printId: 'printBtn2' },
      { modalId: 'pdfModal3', viewerId: 'pdfViewer3', downloadId: 'pdfDownload3', shareId: 'shareBtn3', printId: 'printBtn3' },
      { modalId: 'pdfModal4', viewerId: 'pdfViewer4', downloadId: 'pdfDownload4', shareId: 'shareBtn4', printId: 'printBtn4' },
      { modalId: 'pdfModal5', viewerId: 'pdfViewer5', downloadId: 'pdfDownload5', shareId: 'shareBtn5', printId: 'printBtn5' }
    ];
  
    modals.forEach(modalConfig => {
      const modal = document.getElementById(modalConfig.modalId);
      const pdfViewer = document.getElementById(modalConfig.viewerId);
      const pdfDownload = document.getElementById(modalConfig.downloadId);
      const shareBtn = document.getElementById(modalConfig.shareId);
      const printBtn = document.getElementById(modalConfig.printId);
      const closeButtons = modal.querySelectorAll('.modal-close-btn');
  
      // Abrir modal
      document.querySelectorAll(`.learn-more-btn[data-modal="${modalConfig.modalId}"]`).forEach(button => {
        button.addEventListener('click', function (e) {
          e.preventDefault();
          const pdfUrl = this.getAttribute('data-pdf');
          pdfViewer.src = pdfUrl;
          pdfDownload.href = pdfUrl;
          shareBtn.setAttribute('data-pdf-url', pdfUrl);
          modal.classList.add('open');
        });
      });
  
      // Cerrar modal
      closeButtons.forEach(button => {
        button.addEventListener('click', function () {
          modal.classList.remove('open');
          pdfViewer.src = '';
        });
      });
  
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          modal.classList.remove('open');
          pdfViewer.src = '';
        }
      });
  
      // Compartir PDF
      shareBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const pdfUrl = this.getAttribute('data-pdf-url');
        if (navigator.share) {
          navigator.share({
            title: 'Belle Product Details',
            text: 'Check out the details for the Belle product!',
            url: pdfUrl
          }).catch(error => {
            console.error('Error sharing PDF:', error);
          });
        } else {
          console.log('Web Share API not supported. Copy this link: ' + pdfUrl);
        }
      });
  
      // Imprimir PDF
      printBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const pdfUrl = pdfViewer.src;
        if (pdfUrl) {
          const printFrame = document.createElement('iframe');
          printFrame.style.display = 'none';
          document.body.appendChild(printFrame);
          printFrame.src = pdfUrl;
          printFrame.onload = function () {
            try {
              printFrame.contentWindow.print();
              setTimeout(() => document.body.removeChild(printFrame), 1000);
            } catch (error) {
              console.error('Error printing PDF:', error);
              document.body.removeChild(printFrame);
            }
          };
        }
      });
    });
  });


  document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const pdf = btn.dataset.pdf;
      document.getElementById('pdfViewer').src = pdf;
      document.getElementById('pdfDownload').href = pdf;
      document.getElementById('pdfModal').style.display = 'block';
    });
  });
  
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('pdfModal').style.display = 'none';
      document.getElementById('pdfViewer').src = '';
    });
  });
  

  