// Main JavaScript for Global Superstore Display

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Initialize the page with data
function initializePage() {
    populateSummaryStats();
    populateDataTable();
}

// Populate summary statistics
function populateSummaryStats() {
    // Format currency values
    document.getElementById('totalSales').textContent = formatCurrency(summaryData.totalSales);
    document.getElementById('totalProfit').textContent = formatCurrency(summaryData.totalProfit);
    
    // Format number values
    document.getElementById('totalOrders').textContent = formatNumber(summaryData.totalOrders);
    document.getElementById('totalCustomers').textContent = formatNumber(summaryData.totalCustomers);
    document.getElementById('totalCountries').textContent = formatNumber(summaryData.totalCountries);
}

// Populate data table with order records
function populateDataTable() {
    const tableBody = document.getElementById('tableBody');
    
    // Clear existing content
    tableBody.innerHTML = '';
    
    // Loop through orders data and create table rows
    ordersData.forEach(order => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${escapeHtml(order['Order ID'])}</td>
            <td>${formatDate(order['Order Date'])}</td>
            <td>${escapeHtml(order['Customer Name'])}</td>
            <td>${escapeHtml(order['Segment'])}</td>
            <td>${escapeHtml(order['Country'])}</td>
            <td>${escapeHtml(order['Category'])}</td>
            <td>${escapeHtml(order['Sub-Category'])}</td>
            <td>${escapeHtml(order['Product Name'])}</td>
            <td>${formatCurrency(order['Sales'])}</td>
            <td>${order['Quantity']}</td>
            <td class="${order['Profit'] >= 0 ? 'profit-positive' : 'profit-negative'}">${formatCurrency(order['Profit'])}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Format number as currency
function formatCurrency(value) {
    if (value === null || value === undefined || value === '') {
        return '$0.00';
    }
    
    const num = parseFloat(value);
    
    if (isNaN(num)) {
        return '$0.00';
    }
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}

// Format number with commas
function formatNumber(value) {
    if (value === null || value === undefined || value === '') {
        return '0';
    }
    
    const num = parseInt(value);
    
    if (isNaN(num)) {
        return '0';
    }
    
    return new Intl.NumberFormat('en-US').format(num);
}

// Format date string
function formatDate(dateString) {
    if (!dateString) {
        return '';
    }
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (text === null || text === undefined) {
        return '';
    }
    
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Add profit color styling dynamically
const style = document.createElement('style');
style.textContent = `
    .profit-positive {
        color: #28a745 !important;
        font-weight: 600;
    }
    
    .profit-negative {
        color: #dc3545 !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Log completion
console.log('Global Superstore Display initialized successfully');
console.log('Total records loaded:', ordersData.length);