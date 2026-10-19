package com.example.demo.model;

import java.math.BigDecimal;
import java.util.Objects;

import com.example.demo.enums.PaymentStatus;
import com.example.demo.enums.PaymentType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "payments", indexes = @Index(name = "idx_payment_order", columnList = "order_id"),
        /*
         * INDEX order_id (NOT unique: one order may have several attempts)
         * What: lets the database find an order's payments without scanning the table.
         * Why: every pay request checks this order's payments before creating one:
         * - already SUCCESS -> do not charge again
         * - INITIATED / PENDING / AUTHORIZED -> resolve it first (ask the gateway)
         */
        uniqueConstraints = {

                /*
                 * UNIQUE idempotency_key
                 * What: the database rejects a second row with the same client key.
                 * Why: one user intention (double-tap, retry after a lost response) must
                 * create only one payment, even if two identical requests arrive at
                 * the same instant. A check in code alone can race; this cannot.
                 * On violation: DataIntegrityViolationException -> the service catches it
                 * and returns the existing payment found by this key.
                 * Also acts as an index, so findByIdempotencyKey(...) is fast.
                 */
                @UniqueConstraint(name = "uk_payment_idempotency", columnNames = "idempotency_key"),
                /*
                 * UNIQUE gateway_payment_id
                 * What: one gateway payment id can belong to only one row of ours.
                 * Why: stops a duplicate webhook or a bug from linking the same gateway
                 * payment to two records.
                 * Null is fine: it is null until the gateway responds, and MySQL/Postgres
                 * allow many nulls in a unique column.
                 */
                @UniqueConstraint(name = "uk_payment_gateway_id", columnNames = "gateway_payment_id")
        })
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type", nullable = false)
    private PaymentType paymentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus;

    @Column(nullable = false, updatable = false)
    private BigDecimal amount;

    @Column(name = "idempotency_key", nullable = false, updatable = false)
    private String idempotencyKey;

    @Column(name = "gateway_payment_id")
    private String gatewayPaymentId;

    @Column(name = "failure_reason")
    private String failureReason;

    public Payment(Order order, PaymentType paymentType,
            String idempotencyKey) {

        this.order = Objects.requireNonNull(order, "Order is required");
        this.paymentType = Objects.requireNonNull(paymentType, "PaymentType is required");
        this.paymentStatus = PaymentStatus.INITIATED;
        this.amount = Objects.requireNonNull(order.getTotalPrice(), "Order amount is required");
        if (amount.signum() <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        this.idempotencyKey = Objects.requireNonNull(idempotencyKey, "Idempotency key is required");

    }

    protected Payment() {
    }

    public Long getPaymentId() {
        return paymentId;
    }

    public Order getOrder() {
        return order;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public String getGatewayPaymentId() {
        return gatewayPaymentId;
    }

    public void markSuccess(String gatewayPaymentId) {
        requireStatus(PaymentStatus.INITIATED, PaymentStatus.PENDING);

        this.gatewayPaymentId = Objects.requireNonNull(
                gatewayPaymentId,
                "Gateway payment id is required");

        this.paymentStatus = PaymentStatus.CONFIRMED;
    }

    public void markPending(String gatewayPaymentId) {
        requireStatus(PaymentStatus.INITIATED);

        this.gatewayPaymentId = gatewayPaymentId; // May be null if the gateway provides it later
        this.paymentStatus = PaymentStatus.PENDING;
    }

    public void markFailed(String reason) {
        requireStatus(PaymentStatus.INITIATED, PaymentStatus.PENDING);

        this.failureReason = reason;
        this.paymentStatus = PaymentStatus.FAILED;
    }

    private void requireStatus(PaymentStatus... allowed) {
        for (PaymentStatus s : allowed) {
            if (paymentStatus == s) {
                return;
            }
        }

        throw new IllegalStateException(
                "Invalid payment transition from " + paymentStatus);
    }
}
