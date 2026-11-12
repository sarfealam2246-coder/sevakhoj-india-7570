try {
Here's the raw JavaScript for TAB 1 and TAB 2 functionality:

```javascript
window.renderTabs12 = async function() {
    // Tab 1: Home & Booking
    const user = await FactoryDB.getUser();
    const bookings = await FactoryDB.getItems('booking');
    const services = await FactoryDB.getItems('service_listing');
    
    // Tab 1 Content
    document.getElementById('view-1').innerHTML = `
        <div class="p-4 space-y-6">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    Welcome to SevaKhoj India, ${user.name || 'User'}!
                </h1>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-sm bg-blue-100 border-blue-300 text-blue-800">
                        <i data-lucide="map-pin" class="w-4 h-4"></i>
                        <span id="current-city">All Cities</span>
                        <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a onclick="document.getElementById('current-city').textContent='All Cities'">All Cities</a></li>
                        <li><a onclick="document.getElementById('current-city').textContent='Mumbai'">Mumbai</a></li>
                        <li><a onclick="document.getElementById('current-city').textContent='Delhi'">Delhi</a></li>
                        <li><a onclick="document.getElementById('current-city').textContent='Patna'">Patna</a></li>
                        <li><a onclick="document.getElementById('current-city').textContent='Lucknow'">Lucknow</a></li>
                    </ul>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-2">
                <div class="stats shadow bg-gradient-to-br from-blue-50 to-blue-100">
                    <div class="stat">
                        <div class="stat-title text-blue-800">Total Bookings</div>
                        <div class="stat-value text-blue-600">${bookings.length}</div>
                    </div>
                </div>
                <div class="stats shadow bg-gradient-to-br from-emerald-50 to-emerald-100">
                    <div class="stat">
                        <div class="stat-title text-emerald-800">Active Services</div>
                        <div class="stat-value text-emerald-600">${services.length}</div>
                    </div>
                </div>
                <div class="stats shadow bg-gradient-to-br from-amber-50 to-amber-100">
                    <div class="stat">
                        <div class="stat-title text-amber-800">Reward Points</div>
                        <div class="stat-value text-amber-600">${user.points || 0}</div>
                    </div>
                </div>
            </div>

            <h2 class="text-xl font-semibold text-gray-700">Service Categories</h2>
            <div class="grid grid-cols-2 gap-4">
                ${['Electrician', 'Plumber', 'AC Repair', 'Carpenter', 'Tiffin Service', 'Home Tutor'].map((service, i) => `
                    <div class="card shadow-md cursor-pointer hover:shadow-lg transition-all" 
                         onclick="FactoryNav.openDetail('${service}')">
                        <div class="card-body p-4 rounded-xl bg-gradient-to-br ${
                            i % 3 === 0 ? 'from-blue-100 to-violet-100' : 
                            i % 3 === 1 ? 'from-emerald-100 to-blue-100' : 'from-amber-100 to-violet-100'
                        }">
                            <div class="flex items-center space-x-3">
                                <div class="p-2 rounded-full ${
                                    i % 3 === 0 ? 'bg-blue-200' : 
                                    i % 3 === 1 ? 'bg-emerald-200' : 'bg-amber-200'
                                }">
                                    <i data-lucide="${
                                        service === 'Electrician' ? 'zap' :
                                        service === 'Plumber' ? 'droplets' :
                                        service === 'AC Repair' ? 'snowflake' :
                                        service === 'Carpenter' ? 'hammer' :
                                        service === 'Tiffin Service' ? 'utensils' : 'graduation-cap'
                                    }" class="w-6 h-6 ${
                                        i % 3 === 0 ? 'text-blue-600' : 
                                        i % 3 === 1 ? 'text-emerald-600' : 'text-amber-600'
                                    }"></i>
                                </div>
                                <h3 class="card-title text-lg font-medium">${service}</h3>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Tab 2: Bookings & Status Desk
    document.getElementById('view-2').innerHTML = `
        <div class="p-4 space-y-4">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Your Bookings
            </h1>
            
            ${bookings.length === 0 ? `
                <div class="text-center py-12">
                    <i data-lucide="calendar-x" class="w-12 h-12 mx-auto text-gray-400"></i>
                    <p class="mt-4 text-gray-500">No bookings yet</p>
                </div>
            ` : `
                <div class="space-y-3">
                    ${bookings.map(booking => `
                        <div class="card bg-base-100 shadow-sm border ${
                            booking.status === 'Confirmed' ? 'border-emerald-200' : 
                            booking.status === 'Rejected' ? 'border-red-200' : 'border-amber-200'
                        }">
                            <div class="card-body p-4">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h3 class="font-medium">${booking.title}</h3>
                                        <p class="text-sm text-gray-500">${new Date(booking.date).toLocaleDateString()} • ${booking.time}</p>
                                    </div>
                                    <span class="badge ${
                                        booking.status === 'Confirmed' ? 'badge-success' : 
                                        booking.status === 'Rejected' ? 'badge-error' : 'badge-warning'
                                    }">${booking.status}</span>
                                </div>
                                <p class="text-sm mt-2">${booking.address.substring(0, 40)}${booking.address.length > 40 ? '...' : ''}</p>
                                
                                <div class="card-actions justify-end mt-3">
                                    ${booking.status === 'Pending' ? `
                                        <button class="btn btn-sm btn-success" 
                                            onclick="updateBookingStatus('${booking.id}', 'Confirmed')">
                                            Confirm
                                        </button>
                                        <button class="btn btn-sm btn-error" 
                                            onclick="rejectBooking('${booking.id}')">
                                            Reject
                                        </button>
                                    ` : ''}
                                    <button class="btn btn-sm btn-outline" 
                                        onclick="shareBooking('${booking.id}')">
                                        <i data-lucide="share-2" class="w-4 h-4"></i> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;

    // Initialize Lucide icons
    lucide.createIcons();
};

function updateBookingStatus(id, status) {
    FactoryDB.saveItem('booking', id, { status }).then(() => {
        FactoryUI.toast(`Booking ${status.toLowerCase()}!`, 'success');
        window.renderTabs12();
    });
}

async function rejectBooking(id) {
    const reason = await FactoryUI.prompt('Rejection Reason', 'Please specify why this booking is being rejected:');
    if (reason) {
        await FactoryDB.saveItem('booking', id, { 
            status: 'Rejected',
            rejectionReason: reason
        });
        FactoryUI.toast('Booking rejected!', 'error');
        window.renderTabs12();
    }
}

async function shareBooking(id) {
    const booking = await FactoryDB.getItem('booking', id);
    const message = `SevaKhoj Booking: ${booking.title}\nDate: ${new Date(booking.date).toLocaleDateString()}\nStatus: ${booking.status}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

window.onFloatingAction = function() {
    FactoryUI.modal({
        title: 'Register New Service Provider',
        content: `
            <div class="space-y-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Full Name</span>
                    </label>
                    <input type="text" id="provider-name" class="input input-bordered" required>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Service Category</span>
                    </label>
                    <select id="provider-category" class="select select-bordered" required>
                        <option value="">Select category</option>
                        <option>Electrician</option>
                        <option>Plumber</option>
                        <option>AC Repair</option>
                        <option>Carpenter</option>
                        <option>Tiffin Service</option>
                        <option>Home Tutor</option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">City</span>
                        </label>
                        <select id="provider-city" class="select select-bordered" required>
                            <option>Mumbai</option>
                            <option>Delhi</option>
                            <option>Patna</option>
                            <option>Lucknow</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Visit Fee (₹)</span>
                        </label>
                        <input type="number" id="provider-fee" class="input input-bordered" required>
                    </div>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Mobile Number</span>
                    </label>
                    <input type="tel" id="provider-mobile" class="input input-bordered" pattern="[0-9]{10}" required>
                </div>
            </div>
        `,
        buttons: [
            {
                text: 'Cancel',
                class: 'btn-ghost'
            },
            {
                text: 'Register',
                class: 'btn-primary',
                action: async () => {
                    const data = {
                        name: document.getElementById('provider-name').value,
                        category: document.getElementById('provider-category').value,
                        city: document.getElementById('provider-city').value,
                        fee: FactoryUI.safeNum(document.getElementById('provider-fee').value),
                        mobile: document.getElementById('provider-mobile').value,
                        rating: 0,
                        joined: new Date().toISOString()
                    };
                    
                    if (!data.name || !data.category || !data.mobile || isNaN(data.fee)) {
                        FactoryUI.toast('Please fill all fields correctly', 'error');
                        return false;
                    }

                    await FactoryDB.saveItem('service_listing', `${data.name} (${data.category})`, data);
                    FactoryUI.toast('Service provider registered!', 'success');
                    window.renderTabs12();
                    return true;
                }
            }
        ]
    });
};

// --- PART B ---
window.renderTabs34 = async function() {
    // Populate view-3 with items and leaderboard
    const items = await FactoryDB.getItems('service_listing');
    const leaderboard = await FactoryDB.getLeaderboard();
    
    document.getElementById('view-3').innerHTML = `
        <h2 class="text-2xl font-bold">Service Directory</h2>
        <input type="text" id="app-search-bar" placeholder="Search..." class="mt-2 p-2 border rounded">
        <div id="service-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            ${items.map(item => `
                <div class="border rounded p-4 shadow">
                    <h3 class="font-semibold">${item.name}</h3>
                    <p>Area: ${item.area}</p>
                    <p>Experience: ${item.experience} years</p>
                    <p>Visit Charge: Rs. ${item.visitCharge}</p>
                    <p>Rating: ${item.rating}</p>
                    <button onclick="FactoryNav.openDetail('${item.id}')" class="mt-2 bg-royal-blue text-white p-2 rounded">View Details</button>
                </div>
            `).join('')}
        </div>
        <canvas id="demand-chart" class="mt-4"></canvas>
    `;

    // Populate view-4 with profile and transaction history
    const transactions = await FactoryDB.getTransactions();
    const user = await FactoryDB.getUserSync();
    
    document.getElementById('view-4').innerHTML = `
        <h2 class="text-2xl font-bold">Profile</h2>
        <p>Name: ${user.name}</p>
        <p>Mobile: ${user.mobile}</p>
        <h3 class="mt-4">Transaction History</h3>
        <ul>
            ${transactions.map(tx => `
                <li>${tx.date}: Rs. ${tx.amount} - ${tx.description}</li>
            `).join('')}
        </ul>
        <button onclick="FactoryUI.downloadPDF()" class="mt-4 bg-emerald-500 text-white p-2 rounded">Download Booking Summary PDF</button>
        <button onclick="FactoryUI.logout()" class="mt-2 bg-red-500 text-white p-2 rounded">Log Out</button>
    `;

    // Initialize Chart.js for demand chart
    const ctx = document.getElementById('demand-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: items.map(item => item.name),
            datasets: [{
                label: 'Service Demand',
                data: leaderboard.map(lb => lb.demand),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

window.onSearchInput = function(q) {
    const searchTerm = q.toLowerCase();
    const serviceList = document.getElementById('service-list');
    const items = serviceList.getElementsByTagName('div');
    
    for (let item of items) {
        const name = item.getElementsByTagName('h3')[0].innerText.toLowerCase();
        item.style.display = name.includes(searchTerm) ? 'block' : 'none';
    }
};

window.onTabChange = function(tabNum) {
    FactoryUI.refreshIcons();
};

window.onAppReady = async function() {
    if (window.renderTabs12) await window.renderTabs12();
    if (window.renderTabs34) await window.renderTabs34();
    FactoryUI.refreshIcons();
};

if (window.FactoryDB && FactoryDB.getUserSync()) {
    window.onAppReady();
}
} catch (sfErr) { console.error("AppJS Error:", sfErr); if (window.FactoryNav) window.FactoryNav.ensureNonBlank(); }