// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
    },
    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
  });
});
