(row) => {
    if (row.attempts != null && 1 * row.attempts > 0) {
        return _('span', { className: 'badge badge-pill badge-secondary' }, row.attempts + ' Attempt(s)');
    }
    if (1 * row.lkp_compliant < 0 && 1 * row.lkp_compliant != -9999 && 1 * row.lkp_compliant != -8888)
        return _('span', { className: 'badge badge-pill badge-warning' }, 'Due within ' + (-1 * row.lkp_compliant) + ' days');
    else if (1 * row.lkp_compliant == 9999) return _('span', { className: 'badge badge-pill badge-success' }, 'Compliant');
    else if (1 * row.lkp_compliant == 8888) return _('span', { className: 'badge badge-pill badge-primary' }, 'Submitted after due date');
    else if (1 * row.lkp_compliant > 0 && 1 * row.lkp_compliant != 9999 && 1 * row.lkp_compliant != 8888) return _('span', { className: 'badge badge-pill badge-danger' }, 1 * row.lkp_compliant + ' days past due');
    else if (1 * row.lkp_compliant < 0 && 1 * row.lkp_compliant == -9999) return _('span', { className: 'badge badge-pill badge-danger' }, 'Missing Dates');
    else if (1 * row.lkp_compliant < 0 && 1 * row.lkp_compliant == -8888) return _('span', { className: 'badge badge-pill badge-secondary' }, 'Activity not submitted');
    else if (row.lkp_compliant != '' && 1 * row.lkp_compliant == 0) return _('span', { className: 'badge badge-pill badge-warning' }, 'Due today');
    else return '';
}