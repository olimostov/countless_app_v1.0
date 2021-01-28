import {
  transactionGroupOptions,
  transactionCategoryOptions,
  transactionSubCategoryOptions
} from '../../_data';

const sideNav = () => {
  M.Sidenav.init(document.querySelector('.sidenav'));

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelector('.transaction-group-options');
    var instances = M.FormSelect.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function () {
    var cal = document.querySelector('.datepicker');
    var calInstances = M.Datepicker.init(cal);
  });
};

sideNav();
const addTransactionForm = () => {};

document.addEventListener('DOMContentLoaded', function () {
  let groupInstance = M.Autocomplete.init(group, {
    data: transactionGroupOptions
  });
  let categoryInstance = M.Autocomplete.init(category, {
    data: transactionCategoryOptions
  });
  let subCategoryInstance = M.Autocomplete.init(subCategory, {
    data: transactionSubCategoryOptions
  });
});
addTransactionForm();
