package com.domain80.wholistika.features.userAccount.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;

import java.util.UUID;


@Entity
@Audited
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicalCondition {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(  nullable = false)
    private String name;

    @Column(  nullable = false)
    private String summary;

    @ManyToOne
    @JoinColumn( nullable=false)
    private UserAccount userAccount;

}