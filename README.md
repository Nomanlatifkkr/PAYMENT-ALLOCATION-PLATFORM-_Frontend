<!DOCTYPE html>
<html lang="en">

<body>

<header>
  <h1>🚀 Payment Allocation Platform</h1>
  <p>
    Automated Stripe-based payment routing system that splits incoming payments
    into reserve allocations and instantly transfers the remainder to a main destination.
  </p>
</header>

<section>
  <h2>🎯 Core Objective</h2>
  <div class="card">
    <ul>
      <li>Connect Stripe via Stripe Connect</li>
      <li>Add main and reserve bank destinations</li>
      <li>Assign allocation percentages</li>
      <li>Automatically split each payment</li>
      <li>Route remainder to main destination</li>
      <li>Dashboard + Ledger + Reporting</li>
      <li>Rules persist for future payments</li>
    </ul>
    <p><span class="highlight">Trigger:</span> Stripe webhook → invoice.paid</p>
  </div>
</section>

<section>
  <h2>🧠 Allocation Model</h2>
  <div class="card">
    <p><strong>Formula:</strong></p>
    <pre>
reserve_i = floor(T_cents × percent_i / 100)
main = T_cents − sum(reserve_i)
    </pre>
    <ul>
      <li>Reserve % must be ≤ 100%</li>
      <li>Applies only to future payments</li>
      <li>Main receives remaining balance</li>
    </ul>
  </div>
</section>

<section>
  <h2>🔌 Stripe Architecture</h2>
  <div class="card">
    <ul>
      <li>Separate Charges & Transfers model</li>
      <li>Platform receives funds first</li>
      <li>Transfers routed to connected accounts</li>
      <li>Users never receive unsplit funds</li>
    </ul>
  </div>
</section>

<section>
  <h2>🪜 Tier System</h2>
  <div class="card">
    <ul>
      <li><strong>Free:</strong> Main only</li>
      <li><strong>Paid:</strong> Main + 2 reserves</li>
      <li><strong>Premium:</strong> Main + unlimited reserves</li>
    </ul>
  </div>
</section>

<section>
  <h2>⚡ Payment Workflow</h2>
  <div class="card">
    <ol>
      <li>Verify Stripe webhook signature</li>
      <li>Load allocation config</li>
      <li>Compute split amounts</li>
      <li>Create transfers (idempotent)</li>
      <li>Write ledger events</li>
      <li>Update reporting</li>
    </ol>
  </div>
</section>

<section>
  <h2>📊 Dashboard & Reporting</h2>
  <div class="card">
    <ul>
      <li>Revenue summary totals</li>
      <li>Per-payment breakdown</li>
      <li>Transfer status tracking</li>
      <li>Date & destination filters</li>
      <li>CSV exports</li>
    </ul>
  </div>
</section>

<section>
  <h2>🔒 Security & Reliability</h2>
  <div class="card">
    <ul>
      <li>Webhook signature verification</li>
      <li>Idempotent transfers</li>
      <li>Retry-safe failure handling</li>
      <li>Environment-based secrets</li>
      <li>Immutable ledger logging</li>
    </ul>
  </div>
</section>

<section>
  <h2>📌 Acceptance Criteria</h2>
  <div class="card">
    <ul>
      <li>Stripe connection functional</li>
      <li>Destination onboarding works</li>
      <li>Tier enforcement active</li>
      <li>Correct allocation math</li>
      <li>Instant transfer routing</li>
      <li>Accurate reporting</li>
      <li>Persistence for future payments</li>
    </ul>
  </div>
</section>

<footer>
  © 2026 Payment Allocation Platform MVP | Built with React + Stripe Connect
</footer>

</body>
</html>
